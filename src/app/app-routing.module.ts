import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BannedUsersComponent} from "./banned-users/banned-users.component";
import {MapBonusesComponent} from "./map-bonuses/map-bonuses.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
