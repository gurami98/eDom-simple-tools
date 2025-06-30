import { Injectable } from '@angular/core';
import {User, UsersResponse} from "../models";
import {HttpClient} from "@angular/common/http";
import {countries} from "../countries";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  allUsers: User[] = []

  constructor(private http: HttpClient) {
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
}
