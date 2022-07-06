import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { ConfigService } from '../../shared/services/model/config.service';
import { DatabaseService } from '../../shared/services/model/database.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  constructor(public darkModeService: DarkModeService,public databaseService : DatabaseService, private configService : ConfigService) {}

  ngOnInit(): void {}

  async toggleDarkOrLightMode() {
    this.darkModeService.darkModeActivated.value
      ? this.darkModeService.toggleLightMode()
      : this.darkModeService.toggleDarkMode();
    const db = await this.databaseService.getDatabaseConnection()
    this.configService.setModeApp(db,this.darkModeService.darkModeActivated.value ? 'true' :'false');
    await db.close();
  }


}
