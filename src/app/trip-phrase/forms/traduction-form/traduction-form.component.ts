import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, startWith, map } from 'rxjs';
import {
  FLAGS_PATH,
  FLAG_IMAGE_EXTENSION,
} from '../../../shared/constant/config';
import { COUNTRIES } from '../../../shared/constant/countries';
import { Country } from '../../../shared/model/country';
import { Phrase } from '../../../shared/model/phrase';
import { Reference } from '../../../shared/model/reference';
import { DatabaseService } from '../../../shared/services/model/database.service';
import { ReferenceModelService } from '../../../shared/services/model/reference-model.service';

@Component({
  selector: 'app-traduction-form',
  templateUrl: './traduction-form.component.html',
  styleUrls: ['./traduction-form.component.sass'],
})
export class TraductionFormComponent implements OnChanges {
  public flagPath = FLAGS_PATH;
  public flagExt = FLAG_IMAGE_EXTENSION;

  /**
   * Listes des langues/pays
   */
  //Liste de base
  private langOptions: Country[] = [];
  //Observable de filtrage
  public filteredOptionsCountries: Observable<Country[]> | undefined;

  /**
   * Thème selectionné
   */
  @Input()
  public refSelected: Reference | undefined | void | null;

  /**
   * Lecture seule visualisation
   */
  @Input()
  public isReadOnly = false;

  /**
   * Formulaire d'ajout de phrases
   */
  public addPhraseForm: FormGroup = this.fb.group({
    langControl: null,
    phrases: this.fb.array([], [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private referenceModelService: ReferenceModelService,
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  public initData() {
    const defaultLangue = this.getLangueObject(
      this.translateService.currentLang
    );
    this.langOptions = COUNTRIES;
    this.filteredOptionsCountries = this.addPhraseForm.controls[
      'langControl'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterCountry(value))
    );
    if (this.refSelected?.phrases.length === 0) {
      !!defaultLangue ? this.addPhraseLine(defaultLangue) : null;
    } else {
      this.refSelected?.phrases.map((traduction: Phrase) => {
        const langue = this.getLangueObject(traduction.code_langue);
        !!langue ? this.addPhraseLine(langue, traduction.phrase) : null;
      });
    }
  }

  public ngOnChanges() {
    if (!!this.refSelected) {
      this.initData();
    }
  }

  public getLangueObject(code_langue: string) {
    return COUNTRIES.find(
      (country: Country) => country.code === code_langue
    );
  }

  public addPhraseLine(langue: Country, texte: string = ''): void {
    if (!!langue && typeof langue !== 'string') {
      if (!this.isLanguageAlreadyAdded(langue)) {
        const linePhraseForm = this.fb.group({
          texte: [{
            value: texte,
            disabled: this.isReadOnly
        }, Validators.required],
          langue: [langue, Validators.required],
        });
        this.phrases.push(linePhraseForm);
      }
    }
    this.addPhraseForm.controls['langControl'].setValue(undefined);
  }

  public async sendPhrases() {
    const reference: Reference = {
      theme: !!this.refSelected ? this.refSelected.id : null,
      image: '',
      phrases: [],
    };
    this.phrases.value.forEach((phrase: { langue: Country; texte: string }) => {
      reference.phrases.push({
        langue: phrase.langue,
        phrase: phrase.texte,
      } as Phrase);
    });
    const db = await this.databaseService.getDatabaseConnection();
    await this.referenceModelService.insertReference(db, reference);
    await db.close();
    this.router.navigate(['/lists']);
  }

  public isLanguageAlreadyAdded(langue: Country) {
    return !!this.phrases.value.find(
      (addedLanguage: any) => addedLanguage.langue.code === langue.code
    );
  }

  public displayNameLangue(country: Country) {
    return country && country.name ? country.name : '';
  }

  private _filterCountry(value: Country | string): Country[] {
    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : !!value
        ? value.name.toLowerCase()
        : '';
    return this.langOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public deleteLine(index: number): void {
    this.phrases.removeAt(index);
  }

  get phrases() {
    return this.addPhraseForm.controls['phrases'] as FormArray;
  }

  get textControl() {
    return this.addPhraseForm.controls['phrases'] as FormArray;
  }
}
