import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {Resource, ResourcesResponse} from "../models";
import {countries} from "../countries";

@Component({
  selector: 'app-map-bonuses',
  templateUrl: './map-bonuses.component.html',
  styleUrls: ['./map-bonuses.component.scss']
})
export class MapBonusesComponent implements OnInit {
  resources: Resource[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMapResourcesData();
  }

  fetchMapResourcesData(){
    this.http.get<ResourcesResponse>('https://edominations.com/en/api/map/1').pipe(
      tap((resources) => {
        for (let resourceKey in resources) {
          resources[resourceKey].regionID = resourceKey;
          const country = countries.find( country => country.id === resources[resourceKey].owner_current_id)
          resources[resourceKey].owner_current_name = country ? country.name : '';
          resources[resourceKey].owner_current_value = country ? country.value : '';

          const originalCountry = countries.find( country => country.id === resources[resourceKey].owner_original_id)
          resources[resourceKey].owner_original_name = originalCountry ? originalCountry.name : '';
          resources[resourceKey].owner_original_value = originalCountry ? originalCountry.value : '';
          this.resources.push(resources[resourceKey])
        }
      }),
    ).subscribe()
  }

  openRegion(resource: Resource){
    window.open(
      `https://edominations.com/en/country/region/${resource.owner_current_id}/${resource.owner_current_value}/${resource.regionID}`,
      '_blank'
    )
  }
}
