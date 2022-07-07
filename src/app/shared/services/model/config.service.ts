import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DarkModeService } from '../dark-mode.service';
const QUERY_CREATE_CONFIG_TABLE =
  'CREATE TABLE IF NOT EXISTS CONFIG (id integer PRIMARY KEY,key,value);';

const  QUERY_INSERT_DARK_MODE = (value : string) =>
  'INSERT OR REPLACE INTO CONFIG (id,key,value) VALUES (1,"DARK_MODE","'+ value +'");';

  const  QUERY_GET_DARK_MODE = 
  'SELECT * FROM CONFIG WHERE key="DARK_MODE"';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private darkModeService : DarkModeService) { }

  initDataInsert(db: SQLiteDBConnection){
    return db
    .query(QUERY_CREATE_CONFIG_TABLE)
    .catch((err) => console.log(err));
  }

  setModeApp(db: SQLiteDBConnection, value : string){
      return db
      .query(QUERY_INSERT_DARK_MODE(value))
      .catch((err) => console.log(err));
  }

  async getModeApp(db: SQLiteDBConnection){
    const results : any = await db
    .query(QUERY_GET_DARK_MODE);
    if (!!results && results.values.length === 1) {
      results.values[0].value === 'true'
        ? this.darkModeService.toggleDarkMode()
        : this.darkModeService.toggleLightMode();
    }
}
}
