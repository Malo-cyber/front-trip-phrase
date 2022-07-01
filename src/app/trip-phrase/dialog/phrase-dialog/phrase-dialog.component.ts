import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { count, map, Observable, startWith } from 'rxjs';
import { COUNTRIES } from '../../../shared/constant/countries';

export interface PhraseDialogData {
  themes: string[];
}

@Component({
  selector: 'app-phrase-dialog',
  templateUrl: './phrase-dialog.component.html',
  styleUrls: ['./phrase-dialog.component.sass'],
})
export class PhraseDialogComponent implements OnInit {
  langControl = new FormControl('');
  langOptions: string[] = [];
  themeControl = new FormControl('');
  themeOptions: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  filteredOptionsCountries: Observable<string[]> | undefined;

  constructor(
    public dialogRef: MatDialogRef<PhraseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhraseDialogData
  ) {}

  ngOnInit(): void {
    this.langOptions = COUNTRIES.map(country=> country.name);
    this.themeOptions = this.data.themes;
    this.filteredOptions = this.themeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTheme(value || ''))
    );
    this.filteredOptionsCountries = this.langControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCountry(value || ''))
    );
  }

  private _filterTheme(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.themeOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.langOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
