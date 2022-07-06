import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FLAGS_PATH, FLAGS_PATH_SQUARE, FLAG_IMAGE_EXTENSION } from '../../shared/constant/config';
import { Country } from '../../shared/model/country';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  /**
   * Formulaire d'ajout de favoris
   */
  public addFavoriteLanguagesForm: FormGroup = new FormGroup([]);

  public favorites: Country[] = [];

  public flagPath = FLAGS_PATH_SQUARE;
  public flagExt = FLAG_IMAGE_EXTENSION;

  constructor() {}

  ngOnInit(): void {}
  public addFavorite(country: Country) {
    if(!!country){
      this.favorites.push(country);
    }
  }

  public deleteFavorite(index :number){
    this.favorites.splice(index,1);
  }
}
