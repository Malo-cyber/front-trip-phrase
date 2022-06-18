import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  private FLAGS_PATH: string = 'assets/images/flags/1x1/';
  private FLAG_IMAGE_EXTENSION: string = '.svg';
  public flagUserCountry: string = '';

  @Input() public headerTitle: string = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.flagUserCountry =
      this.FLAGS_PATH + this.translate.currentLang + this.FLAG_IMAGE_EXTENSION;
  }
}
