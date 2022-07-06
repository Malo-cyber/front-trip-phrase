import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { TranslateService } from '@ngx-translate/core';
import { Phrase } from '../../model/phrase';
import { Reference } from '../../model/reference';
import { CustomTranslationService } from '../custom-translation.service';
import { PhraseModelService } from './phrase-model.service';

const QUERY_CREATE_REFERENCES_TABLE =
  'CREATE TABLE IF NOT EXISTS REFERENCES_KEY (id integer PRIMARY KEY,image,theme);';
const QUERY_INSERT_REFERENCES_INIT_TABLE =
  'INSERT OR REPLACE INTO REFERENCES_KEY (id,image,theme) VALUES (1,null,2),(2,null,null)';
const QUERY_INSERT_REFERENCES_TABLE =
  'INSERT INTO REFERENCES_KEY (image,theme) VALUES ';
const QUERY_GET_REFERENCES_TABLE_ID = 'SELECT * FROM REFERENCES_KEY WHERE id=';
const QUERY_GET_REFERENCES_TABLE = 'SELECT * FROM REFERENCES_KEY WHERE theme=';
const QUERY_GET_SUBJECT_TABLE =
  "SELECT * FROM REFERENCES_KEY WHERE theme IS NULL OR theme =''";

const QUERY_DELETE_REFERENCE = 'DELETE FROM REFERENCES_KEY WHERE id=';

@Injectable({
  providedIn: 'root',
})
export class ReferenceModelService {
  localTraductionList: Reference[] = [];
  constructor(
    private phraseModelService: PhraseModelService,
    public customTranslateService: CustomTranslationService,
    public translateService: TranslateService
  ) {}

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
    const sqlValuesInsert: string =
      '("' + reference.image + '",' + reference.theme + ')';
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

  async getLocalList(db: SQLiteDBConnection) {
    const res: any = await this.getSubjects(db);
    const localTrad = res.values as Reference[];
    localTrad.forEach(async (subject) => {
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
        await this.getReferences(db, subject.id);
      subject.references = resultSubreferences.values as Reference[];

      return Promise.all([
        subject.references.map(async (reference) => {
          const results: any =
            await this.phraseModelService.getPhraseByReference(
              db,
              reference.id
            );
          return (reference.phrases = results.values as Phrase[]);
        }),
      ]);
    });
    return localTrad;
  }

  getReferences(db: SQLiteDBConnection, theme: number | undefined) {
    return db
      .query(QUERY_GET_REFERENCES_TABLE + theme)
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

  async deleteReferenceAndChilds(
    db: SQLiteDBConnection,
    reference: Reference
  ): Promise<void> {
    //Effacage des clés étrangère
    await this.phraseModelService.deletePhrasesForReference(db, reference);
    //Effaçage de la reference mère
    await this.deleteOnlyReference(db, reference);
  }

  public deleteOnlyReference(db: SQLiteDBConnection, reference: Reference) {
    return db
      .execute(QUERY_DELETE_REFERENCE + reference.id)
      .catch((err) => console.log(err));
  }

  getSubjects(db: SQLiteDBConnection) {
    return db.query(QUERY_GET_SUBJECT_TABLE).catch((err) => console.log(err));
  }
}
