import { NgModule } from '@angular/core';
import { TripPhraseRoutingModule } from './trip-phrase-routing.module';
import { BuyComponent } from './buy/buy.component';
import { LearnComponent } from './learn/learn.component';
import { SettingsComponent } from './settings/settings.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PhraseDialogComponent } from './dialog/phrase-dialog/phrase-dialog.component';
import { SubjectDialogComponent } from './dialog/subject-dialog/subject-dialog.component';


@NgModule({
  declarations: [
    BuyComponent,
    LearnComponent,
    SettingsComponent,
    ListsComponent,
    HomeComponent,
    PhraseDialogComponent,
    SubjectDialogComponent
  ],
  imports: [
    TranslateModule,
    SharedModule,
    TripPhraseRoutingModule
  ]
})
export class TripPhraseModule { }
