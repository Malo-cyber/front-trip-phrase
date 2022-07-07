import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslateService } from '@ngx-translate/core';
import {
  FLAGS_PATH,
  FLAG_IMAGE_EXTENSION,
  LANGUAGES_AVALAIBLE,
} from '../../shared/constant/config';
import { Country } from '../../shared/model/country';
import { CustomTranslationService } from '../../shared/services/custom-translation.service';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { ConfigService } from '../../shared/services/model/config.service';
import { DatabaseService } from '../../shared/services/model/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  public flagPath = FLAGS_PATH;
  public flagExt = FLAG_IMAGE_EXTENSION;
  public avalaibleLanguages: Country[] | any = [];
  public currentLang: Country | any;

  constructor(
    public darkModeService: DarkModeService,
    public databaseService: DatabaseService,
    private configService: ConfigService,
    private customTranslateService: CustomTranslationService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    console.log(this.translateService.currentLang);
    this.currentLang = this.customTranslateService.getLangueObject(this.translateService.currentLang);
    this.avalaibleLanguages = LANGUAGES_AVALAIBLE.map((value: string) =>
      this.customTranslateService.getLangueObject(value)
    );
  }

  async toggleDarkOrLightMode() {
    this.darkModeService.darkModeActivated.value
      ? this.darkModeService.toggleLightMode()
      : this.darkModeService.toggleDarkMode();
    const db = await this.databaseService.getDatabaseConnection();
    this.configService.setModeApp(
      db,
      this.darkModeService.darkModeActivated.value ? 'true' : 'false'
    );
    await db.close();
  }

  async toggleLanguage(changes : MatSelectChange){
    const langue = changes.value;
    const db = await this.databaseService.getDatabaseConnection();
    await this.configService.setCurrentLang(db,langue.code)
    await db.close();
    this.translateService.setDefaultLang(langue.code);
    this.translateService.use(langue.code);
  }
}
