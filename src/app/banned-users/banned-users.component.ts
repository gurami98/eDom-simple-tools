import { Component, OnInit } from '@angular/core';
import {User, UsersResponse} from "../models";
import {HttpClient} from "@angular/common/http";
import {countries} from "../countries";
import {tap} from "rxjs";

@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.scss']
})
export class BannedUsersComponent implements OnInit {
  title = 'eDominations-banned-counter';
  reverseCount = 106000;
  allUsers: User[] = []
  // bannedUsers: User[] = []

  game_date_start = new Date('2017-04-25');
  game_date_today = new Date();

  diffMilliseconds = this.game_date_today.getTime() - this.game_date_start.getTime();
  currentEdomDay = Math.floor(this.diffMilliseconds / (1000 * 60 * 60 * 24));

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // if (this.reverseCount >= 0) {
    //   setInterval(() => {
    //     this.fetchMore()
    //   }, 10000)
    // }
    console.log(countries)
    console.log(`Current eDom Day ${this.currentEdomDay}`);
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    countries.forEach(country => {
      this.http.get<UsersResponse>(`https://edominations.com/en/api/citizenship/${country.id}`).pipe(
        tap((users) => {
          for (let usersKey in users) {
            users[usersKey].CountryID = country.id;
            users[usersKey].CountryValue = country.value;
            users[usersKey].CountryName = country.name;
            this.allUsers.push(users[usersKey]);
          }
        })
      ).subscribe()
    })
  }

  // fetchUsersReverse(lastID = 106000, firstID = 105001) {
  //   console.log(lastID, firstID)
  //   const obsArr = []
  //   for (let i = lastID; i >= firstID; i--){
  //     obsArr.push(this.http.get(`https://edominations.com/en/api2/citizen/${i}`).pipe(
  //       map((val: any) => val[0])
  //     ))
  //   }
  //   forkJoin(obsArr).subscribe(val => {
  //     this.allUsers = [...this.allUsers, ...val];
  //     this.reverseCount = this.reverseCount - 1000;
  //     console.log(this.reverseCount)
  //     this.getBannedUsers()
  //   })
  // }

  // fetchMore(){
  //   this.fetchUsersReverse(this.reverseCount, this.reverseCount - 999);
  // }

  get bannedUsers():User[] {
    const bannedUsers = this.allUsers.filter(user => (user.Banned === "Yes" && user.LastSeen >= (this.currentEdomDay - 14)));
    console.log(bannedUsers.sort((a, b) => b.Level - a.Level).map(user => {
      return {
        id: user.ID,
        name: user.Name,
        level: user.Level,
        strength: user.Strength,
        country: user.CountryName,
      }
    }))
    return bannedUsers.sort((a, b) => b.Level - a.Level);
  }

  openProfile(userId: number){
    window.open(`https://edominations.com/en/profile/${userId}`, '_blank')
  }

}
