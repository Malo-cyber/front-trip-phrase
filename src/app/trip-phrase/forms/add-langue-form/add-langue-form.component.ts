import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { COUNTRIES } from '../../../shared/constant/countries';
import { Country } from '../../../shared/model/country';

@Component({
  selector: 'app-add-langue-form',
  templateUrl: './add-langue-form.component.html',
  styleUrls: ['./add-langue-form.component.sass']
})
export class AddLangueFormComponent implements OnInit {


  public FORM_CONTROL_NAME = "LANGUAGE_SELECTION"
   /**
   * Listes des langues/pays
   */
  //Liste de base
  private langOptions: Country[] = [];
  //Observable de filtrage
  public filteredOptionsCountries: Observable<Country[]> | undefined;

  @Input()
  public parentFormGroup : FormGroup;


  public formControlLangue = new FormControl(null);

  @Output() addPhraseLine = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.langOptions = COUNTRIES;
    this.parentFormGroup.addControl(this.FORM_CONTROL_NAME, this.formControlLangue);
     this.filteredOptionsCountries = this.parentFormGroup.controls[
      this.FORM_CONTROL_NAME
      ].valueChanges.pipe(
        startWith(''),
        map((value: any) => this._filterCountry(value))
      );
    
  }


  private _filterCountry(value: Country | string): Country[] {
    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : !!value
        ? value.name.toLowerCase()
        : '';
    return this.langOptions.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public displayNameLangue(country: Country) {
    return country && country.name ? country.name : '';
  }

  sendLangueSelected(){
    this.addPhraseLine.emit(this.formControlLangue.value);
    this.formControlLangue.setValue(null);
  }

}
