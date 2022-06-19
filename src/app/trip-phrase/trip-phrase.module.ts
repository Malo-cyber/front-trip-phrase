import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripPhraseRoutingModule } from './trip-phrase-routing.module';
import { BuyComponent } from './buy/buy.component';
import { LearnComponent } from './learn/learn.component';
import { SettingsComponent } from './settings/settings.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppModule, HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    BuyComponent,
    LearnComponent,
    SettingsComponent,
    ListsComponent,
    HomeComponent
  ],
  imports: [
    TranslateModule,
    SharedModule,
    TripPhraseRoutingModule
  ]
})
export class TripPhraseModule { }
