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
  {
    path: 'buy',
    component: BuyComponent,
    resolve: {
      loaded: DatabaseService,
    },
  },
  {
    path: 'learn',
    component: LearnComponent,
    resolve: {
      loaded: DatabaseService,
    },
  },
  {
    path: 'lists',
    component: ListsComponent,
    resolve: {
      loaded: DatabaseService,
    },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    resolve: {
      loaded: DatabaseService,
    },
  },
  {
    path: 'lists/:action/:id',
    component: TraductionComponent,
    resolve: {
      loaded: DatabaseService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripPhraseRoutingModule {}
