import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  public darkModeActivated :BehaviorSubject<boolean> =new BehaviorSubject<boolean>(true);

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
