import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

const QUERY_CREATE_REFERENCES_TABLE =
  'CREATE TABLE IF NOT EXISTS REFERENCES_KEY (id integer PRIMARY KEY,reference,image,theme);';
const QUERY_INSERT_REFERENCES_TABLE =
  'INSERT OR REPLACE INTO REFERENCES_KEY (id,reference,image,theme) VALUES (1,"FART",null,"REDNECK"),(2,"REDNECK",null,null)';
const QUERY_GET_REFERENCES_TABLE = 'SELECT * FROM REFERENCES_KEY WHERE theme=';
const QUERY_GET_SUBJECT_TABLE =
  'SELECT * FROM REFERENCES_KEY WHERE theme IS NULL';

@Injectable({
  providedIn: 'root',
})
export class ReferenceModelService {
  constructor() {}

  public createTable(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_CREATE_REFERENCES_TABLE)
      .catch((err) => console.log(err));
  }

  public insertPhrase(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_INSERT_REFERENCES_TABLE)
      .catch((err) => console.log(err));
  }

  getReferences(db: SQLiteDBConnection, theme: string) {
    return db
      .query(QUERY_GET_REFERENCES_TABLE + '"' + theme + '"')
      .catch((err) => console.log(err));
  }

  getSubjects(db: SQLiteDBConnection) {
    return db.query(QUERY_GET_SUBJECT_TABLE).catch((err) => console.log(err));
  }
}
