import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.sass']
})
export class BuyComponent implements OnInit {

  constructor(public darkModeService: DarkModeService) { }

  ngOnInit(): void {
  }

}
