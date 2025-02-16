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
}

export interface UsersResponse {
  [id: number]: User;
}
