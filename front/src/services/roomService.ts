import IRoom from "@/interfaces/IRoom";
import BaseService from "./baseService";

class RoomService extends BaseService<IRoom> {
  constructor() {
    super("rooms/");
  }
}

export default RoomService;
