import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseService } from '../shared/services/model/database.service';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home/home.component';
import { LearnComponent } from './learn/learn.component';
import { ListsComponent } from './lists/lists.component';
import { TraductionComponent } from './lists/traduction/traduction.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      loaded: DatabaseService,
    },
  },
  { path: 'buy', component: BuyComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'lists', component: ListsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'lists/:action/:id', component: TraductionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripPhraseRoutingModule {}
