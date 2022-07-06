import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, tap } from 'rxjs';
import { FLAG_IMAGE_EXTENSION, FLAGS_PATH } from '../../shared/constant/config';
import { Phrase } from '../../shared/model/phrase';
import { Reference } from '../../shared/model/reference';
import { CustomTranslationService } from '../../shared/services/custom-translation.service';
import { DatabaseService } from '../../shared/services/model/database.service';
import { PhraseModelService } from '../../shared/services/model/phrase-model.service';
import { ReferenceModelService } from '../../shared/services/model/reference-model.service';
import { SQLiteService } from '../../shared/services/model/sqlite.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.sass'],
})
export class ListsComponent implements OnInit {
  public subjects:Reference[] = [];
  public flagPath = FLAGS_PATH;
  public flagExt = FLAG_IMAGE_EXTENSION;

  constructor(
    public referenceModelService: ReferenceModelService,
    public phraseModelService: PhraseModelService,
    public dataBaseService: DatabaseService,
    public sqlite: SQLiteService,
    public platform: Platform,
    public customTranslateService: CustomTranslationService,
    public translateService: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshData();
  }

  async refreshData() {
    const db = await this.dataBaseService.getDatabaseConnection();
    this.subjects = await this.referenceModelService.getLocalList(db);
  }

  public async deleteItem(reference : Reference){
    const db = await this.dataBaseService.getDatabaseConnection();
    await this.referenceModelService.deleteReferenceAndChilds(db, reference);
    await db.close();
    this.refreshData();
  }
}
