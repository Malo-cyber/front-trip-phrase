import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';
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
  selector: 'app-phrase-form',
  templateUrl: './phrase-form.component.html',
  styleUrls: ['./phrase-form.component.sass'],
})
export class PhraseFormComponent implements OnInit {
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
  public themeSelected: Reference | undefined | void;

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

  ngOnInit(): void {
    this.langOptions = COUNTRIES;
    this.filteredOptionsCountries = this.addPhraseForm.controls[
      'langControl'
    ].valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterCountry(value))
    );
    const defaultLangue: Country | undefined = COUNTRIES.find(
      (country: Country) => country.code === this.translateService.currentLang
    );
    !!defaultLangue ? this.addPhraseLine(defaultLangue) : null;
  }

  public addPhraseLine(langue: Country): void {
    if (!!langue && typeof langue !== 'string') {
      if (!this.isLanguageAlreadyAdded(langue)) {
        const linePhraseForm = this.fb.group({
          texte: ['', Validators.required],
          langue: [langue, Validators.required],
        });
        this.phrases.push(linePhraseForm);
      }
    }
    this.addPhraseForm.controls['langControl'].setValue(undefined);
  }

  public async sendPhrases() {
    const reference_id = (
      this.translateService.currentLang +
      this.phrases.value[0].texte +
      Math.random() * 150000000000000000
    ).toUpperCase();

    const reference: Reference = {
      reference: reference_id,
      theme: this.themeSelected ? this.themeSelected.reference : '',
      image: '',
      phrases: [],
    };
    this.phrases.value.forEach((phrase: { langue: Country; texte: string }) => {
      reference.phrases.push({
        langue: phrase.langue,
        phrase: phrase.texte,
      } as Phrase);
    });
    console.log(reference);
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
