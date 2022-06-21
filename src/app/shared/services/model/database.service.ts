import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { PhraseModelService } from './phrase-model.service';
import { ReferenceModelService } from './reference-model.service';
import { SQLiteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private sqlite: SQLiteService,
    private phraseModel: PhraseModelService,
    private referenceModel: ReferenceModelService
  ) {}

  public async initData() {
    const db: SQLiteDBConnection = await this.getDatabaseConnection();
    await db.open();
    await this.phraseModel.createTable(db);
    await this.phraseModel.insertPhrase(db);
    await this.referenceModel.createTable(db);
    await this.referenceModel.insertPhrase(db);
    await db.close();
  }

  public getDatabaseConnection() {
    return this.sqlite.initializePlugin().then(async (ret) => {
      return this.sqlite.createConnection(
        'trip-phrase.db',
        false,
        'no-encryption',
        0
      );
    });
  }
}
