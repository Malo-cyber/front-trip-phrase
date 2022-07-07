import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FLAGS_PATH_SQUARE,
  FLAG_IMAGE_EXTENSION,
} from '../../shared/constant/config';
import { Country } from '../../shared/model/country';
import { DatabaseService } from '../../shared/services/model/database.service';
import { FavoriteService } from '../../shared/services/model/favorite.service';

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

  constructor(
    private databaseService: DatabaseService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.favorites = this.favoriteService.favorites;
  }

  public async addFavorite(country: Country) {
    if (!!country) {
      if (!this.isInFavorites(country.code)) {
        const db = await this.databaseService.getDatabaseConnection();
        await this.favoriteService.insertFavorite(db, country.code);
        await db.close();
        this.favorites.push(country);
      }
    }
  }

  public async deleteFavorite(country: Country, index: number) {
    const db = await this.databaseService.getDatabaseConnection();
    await this.favoriteService.deleteFavorite(db, country.code);
    await db.close();
    this.favorites.splice(index, 1);
  }

  private isInFavorites(code_langue: string): boolean {
    return !!this.favorites.find((favorite) => favorite.code === code_langue);
  }
}
