import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
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
    const stringSuject: string | undefined = await this.getTraductions();
    switch (this.route.snapshot.paramMap.get('action')) {
      case 'add-subject':
        this.headerTitle = 'add-subject';
        break;
      case 'add-phrase':
        this.translateService
          .get('add-phrase')
          .pipe(tap((value) => (this.headerTitle = value + stringSuject)))
          .subscribe();
        break;
      case 'edit-phrase':
        this.translateService
          .get('edit-phrase')
          .pipe(tap((value) => (this.headerTitle = value + stringSuject)))
          .subscribe();
        break;
      case 'edit-subject':
        this.translateService
          .get('edit-subject')
          .pipe(tap((value) => (this.headerTitle = value + stringSuject)))
          .subscribe();
        break;
      case 'watch-phrase':
        this.isReadOnly = true;
        this.translateService
          .get('watch-phrase')
          .pipe(tap((value) => (this.headerTitle = value + stringSuject)))
          .subscribe();
        break;
      case 'watch-subject':
        this.isReadOnly = true;
        this.translateService
          .get('subject')
          .pipe(tap((value) => (this.headerTitle = value + stringSuject)))
          .subscribe();
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
      return this.customTranslateService.getTranslationForKey(
        this.translateService.currentLang,
        this.refSelected.phrases
      );
    }
    return '';
  }
}
