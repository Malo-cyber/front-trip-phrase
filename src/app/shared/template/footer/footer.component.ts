import { Component, OnInit } from '@angular/core';
import { BUTTONS } from '../../constant/buttons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  buttons = BUTTONS

  constructor() { }

  ngOnInit(): void {

  }

}
