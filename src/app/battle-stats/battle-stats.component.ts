import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {BattleStatsResponse, UserStats} from "../models";

@Component({
  selector: 'app-battle-stats',
  templateUrl: './battle-stats.component.html',
  styleUrls: ['./battle-stats.component.scss']
})
export class BattleStatsComponent implements OnInit {
  baseUrl = 'https://edominations.com/en/api/battle-damage'
  battleIdFormControl = new UntypedFormControl('', Validators.required);
  userStats: UserStats[] = [];
  attackingSide: UserStats[] = [];
  defendingSide: UserStats[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  openProfile(userId: number){
    window.open(`https://edominations.com/en/profile/${userId}`, '_blank')
  }

  getBattleStats(){
    const url = `${this.baseUrl}/${this.battleIdFormControl.value}`;
    this.http.get<BattleStatsResponse>(url).pipe(
      tap(users => {
        for (let usersKey in users) {
          this.userStats.push(users[usersKey]);
        }
        this.attackingSide = this.userStats.filter(user => user.SIDE === 'attack').sort((a, b) => b.DMG - a.DMG);
        this.defendingSide = this.userStats.filter(user => user.SIDE === 'defense').sort((a, b) => b.DMG - a.DMG);
      }),
    ).subscribe()
  }
}
