import { Component, OnInit } from '@angular/core';
import {BattleStatsResponse, User, UserStats} from "../models";
import {forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-monthly-stats',
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.scss']
})
export class MonthlyStatsComponent implements OnInit {
  baseUrl = 'https://edominations.com/en/api/battle-damage'
  firstBattleIdApril: number = 79843;
  lastBattleIdApril: number = 81133;
  firstBattleIdMay: number = 81134;
  ranking: { [playerId: number]: UserStats } = {};
  rankingArray: Array<UserStats> = [];
  countryRanking: { [country: string]: { DMG: number; Hits: number } } = {};
  countryRankingArray: Array<{ Country: string, DMG: number, Hits: number }> = [];

  showPlayerLeaderboard: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getStats();
  }

  openProfile(userId: number){
    window.open(`https://edominations.com/en/profile/${userId}`, '_blank')
  }

  getStats(){
    const requests = [];

    for (let id = this.firstBattleIdApril; id <= this.lastBattleIdApril; id++) {
      requests.push(this.http.get(`${this.baseUrl}/${id}`));
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

      setTimeout(()=> {
        this.getCountryStats();
      }, 3000)
      console.log(this.rankingArray)
    });
  }

  getCountryStats(){
    const baseUrl = `https://edominations.com/en/api/citizen`
    const requests: any[] = [];

    for (const id in this.ranking) {
      requests.push(this.http.get(`${baseUrl}/${id}`));
    }

    forkJoin(requests).subscribe((players: User[][]) => {
      for (const player of players) {
        if (player.length) {
          this.ranking[player[0].ID].CS = player[0].CS;
        }
      }
      this.rankingArray = Object.values(this.ranking).sort((a, b) => b.Hits - a.Hits);

      for (const player of this.rankingArray) {
        const country = player.CS;

        if (!this.countryRanking[country]) {
          this.countryRanking[country] = { DMG: 0, Hits: 0 };
        }

        this.countryRanking[country].DMG += player.DMG;
        this.countryRanking[country].Hits += player.Hits;
      }

      this.countryRankingArray = Object.entries(this.countryRanking).map(([country, stats]) => ({
        Country: country,
        DMG: stats.DMG,
        Hits: stats.Hits
      })).sort((a, b) => b.Hits - a.Hits);
    });

  }

  sortPlayersByDmgRanking(){
    this.rankingArray = this.rankingArray.sort((a, b) => b.DMG - a.DMG);
  }

  sortPlayersByHitRanking(){
    this.rankingArray = this.rankingArray.sort((a, b) => b.Hits - a.Hits);
  }

  sortCountriesByDmgRanking(){
    this.countryRankingArray = this.countryRankingArray.sort((a, b) => b.DMG - a.DMG);
  }

  sortCountriesByHitRanking(){
    this.countryRankingArray = this.countryRankingArray.sort((a, b) => b.Hits - a.Hits);
  }

}
