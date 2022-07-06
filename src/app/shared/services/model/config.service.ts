import { Injectable } from '@angular/core';
const QUERY_CREATE_CONFIG_TABLE =
  'CREATE TABLE IF NOT EXISTS CONFIG (id integer PRIMARY KEY,key,value);';
  const QUERY_INSERT_CONFIG_INIT_TABLE =
  'INSERT OR REPLACE INTO CONFIG (id,image,theme) VALUES (1,"DARK_MODE","TRUE");';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
}
