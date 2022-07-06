import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, startWith, map, Subject } from 'rxjs';
import {
  FLAGS_PATH,
  FLAG_IMAGE_EXTENSION,
} from '../../../shared/constant/config';
import { COUNTRIES } from '../../../shared/constant/countries';
import { Country } from '../../../shared/model/country';
import { Phrase } from '../../../shared/model/phrase';
import { Reference } from '../../../shared/model/reference';
import { CustomTranslationService } from '../../../shared/services/custom-translation.service';
import { DatabaseService } from '../../../shared/services/model/database.service';
import { ReferenceModelService } from '../../../shared/services/model/reference-model.service';

@Component({
  selector: 'app-traduction',
  templateUrl: './traduction.component.html',
  styleUrls: ['./traduction.component.sass'],
})
export class TraductionComponent implements OnInit {
  public refSelected: Reference | any = null;
  public headerTitle: string = '';
  public isReadOnly = false;
  public action: string | null = this.route.snapshot.paramMap.get('action');

  constructor(
    private route: ActivatedRoute,
    private referenceModelService: ReferenceModelService,
    private databaseService: DatabaseService,
    private customTranslateService: CustomTranslationService,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getTraductions();
    switch (this.route.snapshot.paramMap.get('action')) {
      case 'add-subject':
        this.headerTitle = 'Ajouter un thème';
        break;
      case 'add-phrase':
        this.headerTitle =
          'Ajouter une phrase au thème : ' +
          this.customTranslateService.getTranslationForKey(
            this.translateService.currentLang,
            this.refSelected.phrases
          );
        break;
      case 'edit-phrase':
        this.headerTitle =
          'Editer les phrases de : ' +
          this.customTranslateService.getTranslationForKey(
            this.translateService.currentLang,
            this.refSelected.phrases
          );
        break;
      case 'edit-subject':
        this.headerTitle =
          'Editer le thème : ' +
          this.customTranslateService.getTranslationForKey(
            this.translateService.currentLang,
            this.refSelected.phrases
          );
        break;
      case 'watch-phrase':
        this.isReadOnly = true;
        this.headerTitle =
          'Phrases de : ' +
          this.customTranslateService.getTranslationForKey(
            this.translateService.currentLang,
            this.refSelected.phrases
          );
        break;
      case 'watch-subject':
        this.isReadOnly = true;
        this.headerTitle =
          'Thème : ' +
          this.customTranslateService.getTranslationForKey(
            this.translateService.currentLang,
            this.refSelected.phrases
          );
        break;
    }
  }

  private async getTraductions() {
    if (this.route.snapshot.paramMap.get('id') !== 'subject') {
      const dbConnection = await this.databaseService.getDatabaseConnection();
      const ref = await this.referenceModelService.getReferenceById(
        dbConnection,
        this.route.snapshot.paramMap.get('id')
      );
      this.refSelected = ref;
    }
  }
}
