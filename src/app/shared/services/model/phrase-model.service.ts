import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

const QUERY_CREATE_PHRASES_TABLE =
  'CREATE TABLE IF NOT EXISTS PHRASES (id integer PRIMARY KEY,code_langue,phrase,reference_key);';
const QUERY_INSERT_PHRASES_TABLE =
  'INSERT OR REPLACE INTO PHRASES (id,code_langue,phrase,reference_key) VALUES (1,"fr","Prout",1),(2,"gb","Fart",1),(3,"fr","Beauf",2),(4,"gb","Redneck",2)';
const QUERY_GET_PHRASES_TABLE = 'SELECT * FROM PHRASES';
const QUERY_GET_PHRASES_FROM_REF_TABLE =
  'SELECT * FROM PHRASES WHERE reference_key=';

@Injectable({
  providedIn: 'root',
})
export class PhraseModelService {
  constructor() {}

  public createTable(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_CREATE_PHRASES_TABLE)
      .catch((err) => console.log(err));
  }

  public insertPhrase(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_INSERT_PHRASES_TABLE)
      .catch((err) => console.log(err));
  }

  getPhrases(db: SQLiteDBConnection) {
    return db
      .query(QUERY_GET_PHRASES_TABLE)
      .catch((err) => console.log(err));
  }

  getPhraseByReference(db: SQLiteDBConnection, ref: number) {
    return db
      .query(QUERY_GET_PHRASES_FROM_REF_TABLE + ref)
      .catch((err) => console.log(err));
  }
}
