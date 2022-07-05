import { NgModule } from '@angular/core';
import { TripPhraseRoutingModule } from './trip-phrase-routing.module';
import { BuyComponent } from './buy/buy.component';
import { LearnComponent } from './learn/learn.component';
import { SettingsComponent } from './settings/settings.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PhraseFormComponent } from './form/phrase-form/phrase-form.component';
import { AddPhraseComponent } from './phrase/add-phrase/add-phrase.component';


@NgModule({
  declarations: [
    BuyComponent,
    LearnComponent,
    SettingsComponent,
    ListsComponent,
    HomeComponent,
    PhraseFormComponent,
    AddPhraseComponent
  ],
  imports: [
    TranslateModule,
    SharedModule,
    TripPhraseRoutingModule
  ]
})
export class TripPhraseModule { }
