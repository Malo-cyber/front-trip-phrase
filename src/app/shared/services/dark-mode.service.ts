import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './model/config.service';
import { DatabaseService } from './model/database.service';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  public darkModeActivated :BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);

  constructor() {

  }


  toggleDarkMode(){
    document.body.classList.add('theme-alternate');
    this.darkModeActivated.next(true);
  }


  toggleLightMode(){
    document.body.classList.remove('theme-alternate');
    this.darkModeActivated.next(false);
  }
}
