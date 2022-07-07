import { NgModule } from '@angular/core';
import { TripPhraseRoutingModule } from './trip-phrase-routing.module';
import { BuyComponent } from './buy/buy.component';
import { LearnComponent } from './learn/learn.component';
import { SettingsComponent } from './settings/settings.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { TraductionComponent } from './lists/traduction/traduction.component';
import { TraductionFormComponent } from './forms/traduction-form/traduction-form.component';
import { AddLangueFormComponent } from './forms/add-langue-form/add-langue-form.component';


@NgModule({
  declarations: [
    BuyComponent,
    LearnComponent,
    SettingsComponent,
    ListsComponent,
    HomeComponent,
    TraductionComponent,
    TraductionFormComponent,
    AddLangueFormComponent
  ],
  imports: [
    TranslateModule,
    TripPhraseRoutingModule,
    SharedModule
  ]
})
export class TripPhraseModule { }
