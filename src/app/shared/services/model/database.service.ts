import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import { DarkModeService } from '../dark-mode.service';
import { ConfigService } from './config.service';
import { FavoriteService } from './favorite.service';
import { PhraseModelService } from './phrase-model.service';
import { ReferenceModelService } from './reference-model.service';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  public databaseConnection: SQLiteDBConnection | undefined;

  constructor(
    private sqlite: SQLiteService,
    private phraseModel: PhraseModelService,
    private referenceModel: ReferenceModelService,
    private favoriteService: FavoriteService,
    private configService: ConfigService,
    private platform: Platform,
    private darkModeService: DarkModeService
  ) {
    this.platform.ready().then(async () => {
      this.sqlite.initializePlugin().then(async (ret) => {
        this.initData();
      });
    });
  }

  public async initData() {
    const db: SQLiteDBConnection = await this.getDatabaseConnection();
    await this.phraseModel.createTable(db);
    await this.referenceModel.createTable(db);
    await this.phraseModel.insertPhraseInit(db);
    await this.referenceModel.insertRefInit(db);
    await this.favoriteService.initDataInsert(db);
    await this.configService.initDataInsert(db);
    const res: any = await this.configService.getModeApp(db);
    if(res.values.length === 1){
      res.values[0].value === 'true'
      ? this.darkModeService.toggleDarkMode()
      : this.darkModeService.toggleLightMode();
    }
    await db.close();
  }

  public async getDatabaseConnection(): Promise<SQLiteDBConnection> {
    if (!this.databaseConnection) {
      const jeepSqliteEl = document.querySelector('jeep-sqlite');
      await jeepSqliteEl?.isStoreOpen();
      this.databaseConnection = await this.sqlite.createConnection(
        'trip-phrase.db',
        false,
        'no-encryption',
        0
      );
    }
    await this.databaseConnection.open();
    return this.databaseConnection;
  }
}
