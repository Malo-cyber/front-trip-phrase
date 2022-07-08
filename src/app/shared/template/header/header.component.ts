import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
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
    this.setFlag();
    this.translate.onLangChange
      .pipe(
        tap(
          () =>
            (this.setFlag())
        )
      )
      .subscribe();
  }

  setFlag(){
    this.flagUserCountry =
              FLAGS_PATH_SQUARE +
              this.translate.currentLang +
              FLAG_IMAGE_EXTENSION
  }
}

