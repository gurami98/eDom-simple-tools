import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BannedUsersComponent} from "./banned-users/banned-users.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'banned-users',
    pathMatch: "full"
  },
  {
    path: 'banned-users',
    component: BannedUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
