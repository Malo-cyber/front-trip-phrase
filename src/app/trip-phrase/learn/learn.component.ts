import { Component, OnInit } from '@angular/core';
import { COUNTRIES } from '../../shared/constant/countries';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.sass'],
})
export class LearnComponent implements OnInit {
  public countries = COUNTRIES;

  constructor() {}

  ngOnInit(): void {}
}
