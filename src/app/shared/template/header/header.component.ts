import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FLAGS_PATH_SQUARE, FLAG_IMAGE_EXTENSION } from '../../constant/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  public flagUserCountry: string = '';

  @Input() public headerTitle: string = '';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.flagUserCountry =
    FLAGS_PATH_SQUARE + this.translate.currentLang + FLAG_IMAGE_EXTENSION;
  }
}
