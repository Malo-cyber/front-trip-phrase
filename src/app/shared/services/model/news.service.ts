import { Injectable } from '@angular/core';

const QUERY_CREATE_NEWS_TABLE =
  'CREATE TABLE IF NOT EXISTS CONFIG (id integer PRIMARY KEY,news,date);';
  const QUERY_INSERT_CONFIG_INIT_TABLE =
  'INSERT OR REPLACE INTO CONFIG (id,news,date) VALUES (1,"DARK_MODE","TRUE");';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }
}
