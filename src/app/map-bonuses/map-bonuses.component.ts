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
  resourceType: string = 'weapon';
  resourceRarity: boolean = true;

  resourceTypes: Record<string, string[]> = {
    food: ["Salt", "Grain", "Fruit", "Seafood", "Meat"],
    weapon: ["Steel", "Petrol", "Rubber", "Aluminum", "Saltpeter"],
    house: ["Wood", "Clay", "Cement", "Bitumen", "Stone"]
  };
  rareResourceTypes: Record<string, string[]> = {
    food: ["Meat"],
    weapon: ["Petrol"],
    house: ["Clay"]
  };
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

  get filteredResources(){
    return !this.resourceRarity ? this.resources.filter(resource => this.resourceTypes[this.resourceType].includes(resource.resource)) :
      this.resources.filter(resource => this.rareResourceTypes[this.resourceType].includes(resource.resource))
  }
}
