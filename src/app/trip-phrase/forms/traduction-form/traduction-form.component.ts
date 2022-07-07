import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  FLAGS_PATH,
  FLAG_IMAGE_EXTENSION,
} from '../../../shared/constant/config';
import { Country } from '../../../shared/model/country';
import { Phrase } from '../../../shared/model/phrase';
import { Reference } from '../../../shared/model/reference';
import { CustomTranslationService } from '../../../shared/services/custom-translation.service';
import { DatabaseService } from '../../../shared/services/model/database.service';
import { FavoriteService } from '../../../shared/services/model/favorite.service';
import { ReferenceModelService } from '../../../shared/services/model/reference-model.service';

@Component({
  selector: 'app-traduction-form',
  templateUrl: './traduction-form.component.html',
  styleUrls: ['./traduction-form.component.sass'],
})
export class TraductionFormComponent implements OnChanges {
  public editActions: string[] = ['add-phrase', 'add-subject'];
  public flagPath = FLAGS_PATH;
  public flagExt = FLAG_IMAGE_EXTENSION;

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
   * Action en cours
   */
  @Input()
  public action: string | null = '';

  /**
   * Formulaire d'ajout de phrases
   */
  public addPhraseForm: FormGroup = this.fb.group({
    phrases: this.fb.array([], [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private referenceModelService: ReferenceModelService,
    private databaseService: DatabaseService,
    private customTranslateService: CustomTranslationService,
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  public async initData() {
    const defaultLangue = this.customTranslateService.getLangueObject(
      this.translateService.currentLang
    );

    if (!this.editActions.includes(this.action ? this.action : '')) {
      this.refSelected?.phrases.map((traduction: Phrase) => {
        const langue = this.customTranslateService.getLangueObject(
          traduction.code_langue
        );
        !!langue ? this.addPhraseLine(langue, traduction.phrase) : null;
      });
    } else {
      !!defaultLangue ? this.addPhraseLine(defaultLangue) : null;
      this.favoriteService.favorites.map((favorite: Country) => {
        const langue = this.customTranslateService.getLangueObject(
          favorite.code
        );
        !!langue && langue.code !== this.translateService.currentLang
          ? this.addPhraseLine(langue)
          : null;
      });
    }
  }

  public ngOnChanges() {
    this.initData();
  }

  public addPhraseLine(langue: Country, texte: string = ''): void {
    if (!!langue && typeof langue !== 'string') {
      if (!this.isLanguageAlreadyAdded(langue)) {
        const linePhraseForm = this.fb.group({
          texte: [
            {
              value: texte,
              disabled: this.isReadOnly,
            },
            Validators.required,
          ],
          langue: [langue, Validators.required],
        });
        this.phrases.push(linePhraseForm);
      }
    }
  }

  public async sendPhrases() {
    const reference: Reference = {
      id: this.refSelected?.id,
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
    if (!this.editActions.includes(this.action ? this.action : '')) {
      await this.referenceModelService.updateReferencePhrases(db, reference);
    } else {
      await this.referenceModelService.insertReference(db, reference);
    }
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
