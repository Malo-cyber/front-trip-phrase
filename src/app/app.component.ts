import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DatabaseService } from './shared/services/model/database.service';
import { SQLiteService } from './shared/services/model/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent{
  title = 'front-trip-phrase';
  public isWeb = true;
  private PLATFORM: string = Capacitor.getPlatform();
  private PLATFORMS: string[] = ['android', 'ios'];
  constructor(
    translate: TranslateService,
    public sqlite: SQLiteService,
    public databaseService: DatabaseService,
    public platform: Platform
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('fr');
    this.initializeApp();
  }

  public async initializeApp(): Promise<void> {
    this.platform.ready().then(async () => {
      this.sqlite.initializePlugin().then(async (ret) => {
        if (!this.PLATFORMS.includes(this.PLATFORM)) {
          this.isWeb = true;
          await customElements.whenDefined('jeep-sqlite');
          const jeepSqliteEl = document.querySelector('jeep-sqlite');
          if (jeepSqliteEl != null) {
            await this.sqlite.initWebStore();
            console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
          } else {
            console.log('>>>> jeepSqliteEl is null');
          }
        }
      });
    });
  }
}
