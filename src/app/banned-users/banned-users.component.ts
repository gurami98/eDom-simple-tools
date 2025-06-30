import { Component, OnInit } from '@angular/core';
import {User} from "../models";
import {countries} from "../countries";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.scss']
})
export class BannedUsersComponent implements OnInit {
  title = 'eDominations-banned-counter';
  get allUsers(){
    return this.userService.allUsers;
  }

  game_date_start = new Date('2017-04-25');
  game_date_today = new Date();

  diffMilliseconds = this.game_date_today.getTime() - this.game_date_start.getTime();
  currentEdomDay = Math.floor(this.diffMilliseconds / (1000 * 60 * 60 * 24));

  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log(countries)
    console.log(`Current eDom Day ${this.currentEdomDay}`);
  }

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
    return bannedUsers.sort((a, b) => {
      if (b.LastSeen !== a.LastSeen) {
        return b.LastSeen - a.LastSeen;
      }
      return b.Level - a.Level;
    });
  }

  openProfile(userId: number){
    window.open(`https://edominations.com/en/profile/${userId}`, '_blank')
  }

  parseDateFromLastSeen(LastSeen: number){
    const lastSeenDate = new Date(this.game_date_start.getTime() + LastSeen * 24 * 60 * 60 * 1000);
    const formattedDate = lastSeenDate.toISOString().split('T')[0];
    const [year, month, day] = formattedDate.split('-');
    return `${day}-${month}-${year}`;
  }

}
