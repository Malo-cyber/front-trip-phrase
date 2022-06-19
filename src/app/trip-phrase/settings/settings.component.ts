import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  constructor(public darkModeService: DarkModeService) {}

  ngOnInit(): void {}

  toggleDarkOrLightMode() {
    this.darkModeService.darkModeActivated.value
      ? this.darkModeService.toggleLightMode()
      : this.darkModeService.toggleDarkMode();
  }
}
