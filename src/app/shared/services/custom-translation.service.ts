import { Injectable } from '@angular/core';
import { COUNTRIES } from '../constant/countries';
import { Country } from '../model/country';
import { Phrase } from '../model/phrase';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslationService {

  constructor() {}

  public getTranslationForKey(code_langue: string,phrases:Phrase[]) : string{
    const traduction = phrases.find(phrase=> phrase.code_langue === code_langue)?.phrase;
    return traduction ? traduction : 'Not translated yet';
  }

  public getLangueObject(code_langue: string) {
    return COUNTRIES.find((country: Country) => country.code === code_langue);
  }
}
