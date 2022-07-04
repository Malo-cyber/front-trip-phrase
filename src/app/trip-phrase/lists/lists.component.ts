import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { FLAG_IMAGE_EXTENSION, FLAGS_PATH } from '../../shared/constant/config';
import { Phrase } from '../../shared/model/phrase';
import { Reference } from '../../shared/model/reference';
import { CustomTranslationService } from '../../shared/services/custom-translation.service';
import { DatabaseService } from '../../shared/services/model/database.service';
import { PhraseModelService } from '../../shared/services/model/phrase-model.service';
import { ReferenceModelService } from '../../shared/services/model/reference-model.service';
import { SQLiteService } from '../../shared/services/model/sqlite.service';
import { PhraseDialogComponent } from '../dialog/phrase-dialog/phrase-dialog.component';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.sass'],
})
export class ListsComponent implements OnInit {
  public subjects: Reference[] = [];
  public phrases: Reference[] = [];
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
    await db.open();
    const res: any = await this.referenceModelService.getSubjects(db);

    this.subjects = res.values as Reference[];
    this.subjects.map(async (subject) => {
      const results: any = await this.phraseModelService.getPhraseByReference(
        db,
        subject.id
      );
      subject.phrases = results.values as Phrase[];
      subject.currentLangtrad =
        this.customTranslateService.getTranslationForKey(
          this.translateService.currentLang,
          subject.phrases
        );
      const resultSubreferences: any =
      await this.referenceModelService.getReferences(db, subject.reference);
      subject.references = resultSubreferences.values as Reference[];
      subject.references.map(async (reference) => {
        const results: any = await this.phraseModelService.getPhraseByReference(
          db,
          reference.id
        );
        reference.phrases = results.values as Phrase[];
      });
    });
    await db.close();
  }

  public addPhraseDialog(theme: Reference | undefined) {
    this.dialog
      .open(PhraseDialogComponent, {
        panelClass: 'full-screen-modal',
        maxWidth: '100vw',
        data: {
          theme,
        },
      })
      .afterClosed()
      .pipe(
        tap((resultDialog: string) =>
          !!resultDialog ? this.refreshData() : null
        )
      )
      .subscribe();
  }
}
