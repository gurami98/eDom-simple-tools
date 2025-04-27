import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { BannedUsersComponent } from './banned-users/banned-users.component';
import { MapBonusesComponent } from './map-bonuses/map-bonuses.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BattleStatsComponent } from './battle-stats/battle-stats.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';

@NgModule({
  declarations: [
    AppComponent,
    BannedUsersComponent,
    MapBonusesComponent,
    BattleStatsComponent,
    MonthlyStatsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
