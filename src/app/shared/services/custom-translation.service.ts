import { Injectable } from '@angular/core';
import { COUNTRIES } from '../constant/countries';
import { Country } from '../model/country';
import { Phrase } from '../model/phrase';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslationService {
  constructor() {}

  public getTranslationForKey(
    code_langue: string,
    phrases: Phrase[]
  ): string {
    const phrase = phrases.find(
      (phrase) => phrase.code_langue === code_langue
    );
    return !!phrase && phrase.phrase ? phrase.phrase : 'NO_TRAD_CURRENT_LANGUAGE';
  }

  public getLangueObject(code_langue: string) {
    return COUNTRIES.find((country: Country) => country.code === code_langue);
  }
}
