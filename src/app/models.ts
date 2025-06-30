export interface User {
  Avatar: number;
  Banned: "Yes" | "No";
  ID: number;
  LastSeen: number;
  Level: number;
  MilitaryRank: number;
  MilitaryUnitID: number;
  Name: string;
  PartyID: number;
  Strength: number;
  CountryID: number;
  CountryName: string;
  CountryValue: string;
  CS: string;
  Last7DaysDamage: number;
  Last7DaysHit: number;
}

export interface UsersResponse {
  [id: number]: User;
}

export interface Resource {
  resource: string;
  owner_original_id: number;
  owner_original_name?: string;
  owner_original_value: string;
  owner_current_id: number;
  owner_current_name?: string;
  owner_current_value?: string;
  citizens: number;
  battle: number;
  regionID: string;
}

export interface UserStats{
  DMG: number;
  Hits: number;
  ID: number;
  Name: string;
  SIDE: "attack" | "defense";
  Unit: number;
  CS: string;
}

export interface ResourcesResponse {
  [id: number]: Resource;
}

export interface BattleStatsResponse {
  [id: number]: UserStats;
}
