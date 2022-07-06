import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

const QUERY_CREATE_CONFIG_TABLE =
  'CREATE TABLE IF NOT EXISTS FAVORITES (id integer PRIMARY KEY,code_langue);';
  
  const QUERY_INSERT_FAVORITES_TABLE =
  'INSERT FAVORITES (code_langue) VALUES';

  
  const QUERY_DELETE_FAVORITES_INIT_TABLE =
  'DELETE FROM FAVORITES WHERE code_langue=';



@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  initDataInsert(db: SQLiteDBConnection){
    return db
    .query(QUERY_CREATE_CONFIG_TABLE)
    .catch((err) => console.log(err));
  }

  deleteFavorite(db: SQLiteDBConnection, code_langue: string) {
    return db
      .query(QUERY_DELETE_FAVORITES_INIT_TABLE +'"' +code_langue+'"')
      .catch((err) => console.log(err));
  }
}