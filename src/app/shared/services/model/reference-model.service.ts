import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';


const QUERY_CREATE_REFERENCES_TABLE =
  'CREATE TABLE IF NOT EXISTS REFERENCES_KEY (id integer PRIMARY KEY,reference,image);';
const QUERY_INSERT_REFERENCES_TABLE = 'INSERT INTO REFERENCES_KEY (reference,image) VALUES ("FART",null)';
const QUERY_GET_REFERENCES_TABLE = 'SELECT * FROM REFERENCES_KEY';

@Injectable({
  providedIn: 'root'
})
export class ReferenceModelService {

  constructor() { }


  public createTable(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_CREATE_REFERENCES_TABLE)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  public insertPhrase(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_INSERT_REFERENCES_TABLE)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  getPhrases(db: SQLiteDBConnection) {
    return db
      .query(QUERY_GET_REFERENCES_TABLE)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }
}
