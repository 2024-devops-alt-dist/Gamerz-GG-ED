import userI from "./userI";

export interface IRoom {
  _id?: string;
  game: string;
  users?: userI[] | [];
}
