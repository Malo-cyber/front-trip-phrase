import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBSQLiteValues } from '@capacitor-community/sqlite';
import { TranslateService } from '@ngx-translate/core';
import { Reference } from '../../../shared/model/reference';
import { CustomTranslationService } from '../../../shared/services/custom-translation.service';
import { DatabaseService } from '../../../shared/services/model/database.service';
import { ReferenceModelService } from '../../../shared/services/model/reference-model.service';

@Component({
  selector: 'app-add-phrase',
  templateUrl: './add-phrase.component.html',
  styleUrls: ['./add-phrase.component.sass'],
})
export class AddPhraseComponent implements OnInit {
  public themeSelected: Reference | void | undefined;
  public headerTitle: string = '';

  constructor(
    private route: ActivatedRoute,
    private referenceModelService: ReferenceModelService,
    private databaseService: DatabaseService,
    private customTranslateService: CustomTranslationService,
    private translateService: TranslateService
  ) {}

  async ngOnInit(): Promise<void> {
    const idSubject = this.route.snapshot.paramMap.get('id')
      ? this.route.snapshot.paramMap.get('id')
      : '';
    let theme = null;
    if (idSubject !== '') {
      const dbConnection = await this.databaseService.getDatabaseConnection();
      theme = await this.referenceModelService.getReferenceById(
        dbConnection,
        idSubject
      );
      this.themeSelected = theme;
    }
    !!this.themeSelected
      ? (this.headerTitle =
          'Ajouter une phrase au thème : ' +
          this.customTranslateService.getTranslationForKey(
            this.translateService.currentLang,
            this.themeSelected.phrases
          ))
      : (this.headerTitle = 'Ajouter un thème');
  }
}
