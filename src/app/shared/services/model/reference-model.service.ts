import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Phrase } from '../../model/phrase';
import { Reference } from '../../model/reference';
import { PhraseModelService } from './phrase-model.service';

const QUERY_CREATE_REFERENCES_TABLE =
  'CREATE TABLE IF NOT EXISTS REFERENCES_KEY (id integer PRIMARY KEY,reference,image,theme);';
const QUERY_INSERT_REFERENCES_INIT_TABLE =
  'INSERT OR REPLACE INTO REFERENCES_KEY (id,reference,image,theme) VALUES (1,"FART",null,"REDNECK"),(2,"REDNECK",null,null)';
const QUERY_INSERT_REFERENCES_TABLE =
  'INSERT INTO REFERENCES_KEY (reference,image,theme) VALUES ';
const QUERY_GET_REFERENCES_TABLE_ID = 'SELECT * FROM REFERENCES_KEY WHERE id=';
const QUERY_GET_REFERENCES_TABLE = 'SELECT * FROM REFERENCES_KEY WHERE theme=';
const QUERY_GET_SUBJECT_TABLE =
  "SELECT * FROM REFERENCES_KEY WHERE theme IS NULL OR theme =''";

@Injectable({
  providedIn: 'root',
})
export class ReferenceModelService {
  constructor(private phraseModelService: PhraseModelService) {}

  public createTable(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_CREATE_REFERENCES_TABLE)
      .catch((err) => console.log(err));
  }

  public insertRefInit(db: SQLiteDBConnection) {
    return db
      .execute(QUERY_INSERT_REFERENCES_INIT_TABLE)
      .catch((err) => console.log(err));
  }

  public insertReference(db: SQLiteDBConnection, reference: Reference) {
    console.log(reference);
    const sqlValuesInsert: string =
      '("' +
      reference.reference +
      '","' +
      reference.image +
      '","' +
      reference.theme +
      '")';
    return db
      .run(QUERY_INSERT_REFERENCES_TABLE + sqlValuesInsert)
      .then((res) => {
        if (reference.phrases.length > 0 && res.changes?.lastId) {
          return this.phraseModelService.insertPhrase(
            db,
            reference.phrases,
            res.changes?.lastId
          );
        }
        return Promise.resolve();
      })
      .catch((err) => console.log(err));
  }

  getReferences(db: SQLiteDBConnection, theme: string) {
    return db
      .query(QUERY_GET_REFERENCES_TABLE + '"' + theme + '"')
      .catch((err) => console.log(err));
  }

  getReferenceById(
    db: SQLiteDBConnection,
    id: string | null
  ): Promise<void | Reference> {
    return db
      .query(QUERY_GET_REFERENCES_TABLE_ID + '' + id + '')
      .then(async (result: any) => {
        const reference: Reference[] = result.values as Reference[];
        const phrases: any = await this.phraseModelService.getPhraseByReference(
          db,
          id ? parseInt(id, 10) : 0
        );
        reference[0].phrases = phrases.values as Phrase[];
        return reference[0];
      })
      .catch((err) => console.log(err));
  }

  getSubjects(db: SQLiteDBConnection) {
    return db.query(QUERY_GET_SUBJECT_TABLE).catch((err) => console.log(err));
  }
}
