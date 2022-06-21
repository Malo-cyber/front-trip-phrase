import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

const QUERY_CREATE_PHRASES_TABLE =
  'CREATE TABLE IF NOT EXISTS PHRASES (id integer PRIMARY KEY,code_langue,phrase,reference_key);';
const QUERY_INSERT_PHRASES_TABLE =
  'INSERT INTO PHRASES (code_langue,phrase,reference_key) VALUES ("fr","prout",1),("en","fart",1),("ir","gooz",1)';
const QUERY_GET_PHRASES_TABLE = 'SELECT * FROM PHRASES';

@Injectable({
  providedIn: 'root',
})
export class PhraseModelService {
  constructor() {}

  public createTable(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_CREATE_PHRASES_TABLE)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  public insertPhrase(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_INSERT_PHRASES_TABLE)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  getPhrases(db: SQLiteDBConnection) {
    return db
      .query(QUERY_GET_PHRASES_TABLE)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}
