import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BannedUsersComponent} from "./banned-users/banned-users.component";
import {MapBonusesComponent} from "./map-bonuses/map-bonuses.component";
import {BattleStatsComponent} from "./battle-stats/battle-stats.component";
import {MonthlyStatsComponent} from "./monthly-stats/monthly-stats.component";
import {WeeklyStatsComponent} from "./weekly-stats/weekly-stats.component";
import {DamageCalculatorComponent} from "./damage-calculator/damage-calculator.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'banned-users',
    pathMatch: "full"
  },
  {
    path: 'banned-users',
    component: BannedUsersComponent
  },
  {
    path: 'map-resources',
    component: MapBonusesComponent
  },
  {
    path: 'battle-stats',
    component: BattleStatsComponent
  },
  {
    path: 'monthly-stats',
    component: MonthlyStatsComponent
  },
  {
    path: 'weekly-stats',
    component: WeeklyStatsComponent
  },
  {
    path: 'damage-calculator',
    component: DamageCalculatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
