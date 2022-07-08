import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../dark-mode.service';
const QUERY_CREATE_CONFIG_TABLE =
  'CREATE TABLE IF NOT EXISTS CONFIG (id integer PRIMARY KEY,key,value);';

const  QUERY_INSERT_DARK_MODE = (value : string) =>
  'INSERT OR REPLACE INTO CONFIG (id,key,value) VALUES (1,"DARK_MODE","'+ value +'");';
  const  QUERY_INSERT_CURRENT_LANG = (value : string) =>
  'INSERT OR REPLACE INTO CONFIG (id,key,value) VALUES (2,"CURRENT_LANG","'+ value +'");';

  const  QUERY_GET_DARK_MODE = 
  'SELECT * FROM CONFIG WHERE key="DARK_MODE"';

  const  QUERY_GET_CURRENT_LANG = 
  'SELECT * FROM CONFIG WHERE key="CURRENT_LANG"';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private darkModeService : DarkModeService, private translateService : TranslateService) { }

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

  setCurrentLang(db : SQLiteDBConnection, value :string){
    return db
    .query(QUERY_INSERT_CURRENT_LANG(value))
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

async getCurrentLang(db: SQLiteDBConnection){
  const results : any = await db
  .query(QUERY_GET_CURRENT_LANG);
  if (!!results && results.values.length === 1) {
      this.translateService.setDefaultLang(results.values[0].value);
      this.translateService.use(results.values[0].value);
  }
}
}
