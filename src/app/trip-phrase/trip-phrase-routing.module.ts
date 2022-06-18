import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { ListsComponent } from './lists/lists.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'buy', component : BuyComponent},
  {path : 'learn', component : LearnComponent},
  {path : 'lists', component : ListsComponent},
  {path : 'settings', component : SettingsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripPhraseRoutingModule { }