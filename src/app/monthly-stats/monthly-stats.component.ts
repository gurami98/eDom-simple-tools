import { Component, OnInit } from '@angular/core';
import {BattleStatsResponse, UserStats} from "../models";
import {forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.scss']
})
export class MonthlyStatsComponent implements OnInit {
  baseUrl = 'https://edominations.com/en/api/battle-damage'
  firstBattleId: number = 79843;
  lastBattleId: number = 80980;
  ranking: { [playerId: number]: UserStats } = {};
  rankingArray: Array<UserStats> = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getStats();
  }

  openProfile(userId: number){
    window.open(`https://edominations.com/en/profile/${userId}`, '_blank')
  }

  getStats(){
    const requests = [];

    for (let id = this.firstBattleId; id <= this.lastBattleId; id++) {
      requests.push(this.http.get(`${this.baseUrl}/${id}`)); // Replace with your real API
    }

    forkJoin(requests).subscribe((stats: any) => {
      const battlesStats: BattleStatsResponse[] = stats;

      for (const battle of battlesStats) {
        for (const playerId in battle) {
          const player = battle[playerId];
          const id = player.ID;

          if (!this.ranking[id]) {
            this.ranking[id] = { ...player };
          } else {
            this.ranking[id].DMG += player.DMG;
            this.ranking[id].Hits += player.Hits;
          }
        }
      }
      this.rankingArray = Object.values(this.ranking).sort((a, b) => b.Hits - a.Hits);
      console.log(this.rankingArray)
    });
  }

  sortByDmgRanking(){
    this.rankingArray = this.rankingArray.sort((a, b) => b.DMG - a.DMG);
  }

  sortByHitRanking(){
    this.rankingArray = this.rankingArray.sort((a, b) => b.Hits - a.Hits);
  }

}
