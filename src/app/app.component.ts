import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PhraseModelService } from './shared/services/model/phrase-model.service';
import { ReferenceModelService } from './shared/services/model/reference-model.service';
import { SQLiteService } from './shared/services/model/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'front-trip-phrase';
  private PLATFORM: string = Capacitor.getPlatform();
  public isWeb = false;
  private PLATFORMS: string[] = ['android', 'ios'];

  constructor(
    translate: TranslateService,
    private sqlite: SQLiteService,
    private phraseModel: PhraseModelService,
    private referenceModel: ReferenceModelService,
    private platform: Platform
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
    this.initializeApp();
  }

  private async initializeApp(): Promise<void> {
    this.platform.ready().then(async () => {
      this.sqlite.initializePlugin().then(async (ret) => {
        if (!this.PLATFORMS.includes(this.PLATFORM)) {
          this.isWeb = true;
          await customElements.whenDefined('jeep-sqlite');
          const jeepSqliteEl = document.querySelector('jeep-sqlite');
          if (jeepSqliteEl != null) {
            await this.sqlite.initWebStore();
            console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
          } else {
            console.log('>>>> jeepSqliteEl is null');
          }
        }
        const db: SQLiteDBConnection = await this.getDatabaseConnection();
        await db.open();
        await this.phraseModel.createTable(db);
        await this.phraseModel.insertPhrase(db);
        await this.phraseModel.getPhrases(db);
        await this.referenceModel.createTable(db);
        await this.referenceModel.insertPhrase(db);
        await this.referenceModel.getReferences(db);
        await this.referenceModel.getSubjects(db);
        await db.close();
      });
    });
  }

  private getDatabaseConnection() {
    return this.sqlite.createConnection(
      'trip-phrase.db',
      false,
      'no-encryption',
      0
    );
  }
}
