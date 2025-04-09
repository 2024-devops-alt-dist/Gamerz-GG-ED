import userI from "./userI";

interface IRoom {
  _id?: string;
  game: string;
  users?: userI[] | [];
}
export default IRoom;
