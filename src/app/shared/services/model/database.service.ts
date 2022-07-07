import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Observable, of } from 'rxjs';
import { ConfigService } from './config.service';
import { FavoriteService } from './favorite.service';
import { PhraseModelService } from './phrase-model.service';
import { ReferenceModelService } from './reference-model.service';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService implements Resolve<any> {
  public isDataInit: Observable<boolean> = of(false);

  public databaseConnection: SQLiteDBConnection | undefined;

  constructor(
    private sqlite: SQLiteService,
    private phraseModel: PhraseModelService,
    private referenceModel: ReferenceModelService,
    private favoriteService: FavoriteService,
    private configService: ConfigService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.initData();
  }

  public async initData() {
    const db: SQLiteDBConnection = await this.getDatabaseConnection();
    await this.phraseModel.createTable(db);
    await this.referenceModel.createTable(db);
    await this.phraseModel.insertPhraseInit(db);
    await this.referenceModel.insertRefInit(db);
    await this.favoriteService.initDataInsert(db);
    await this.configService.initDataInsert(db);
    await this.favoriteService.getFavorites(db);
    await this.configService.getModeApp(db);
    await db.close();
    this.isDataInit = of(true);
  }

  public async getDatabaseConnection(): Promise<SQLiteDBConnection> {
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    await jeepSqliteEl?.isStoreOpen();
    if (!this.databaseConnection) {
      this.databaseConnection = await this.sqlite.createConnection(
        'trip-phrase.db',
        false,
        'no-encryption',
        1
      );
    }
    await this.databaseConnection.open();
    return this.databaseConnection;
  }
}
