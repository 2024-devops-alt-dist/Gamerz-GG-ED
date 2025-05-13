import { useContext, useEffect, useState } from "react";
import RoomService from "@/services/roomService";

import AuthContext from "@/context/AuthContext";
import { columnRoomAdmin } from "@/components/dataTable/dataTableRooms/columns/ColumnRoomAdmin";
import DataTableRoom from "@/components/dataTable/dataTableRooms/DataTableRoom";
import { columnRoom } from "@/components/dataTable/dataTableRooms/columns/ColumnRoom";
import { IRoom } from "@/interfaces/IRoom";

interface ListRoomsProps {
  variant?: "admin" | "";
}

function ListRooms({ variant = "admin" }: ListRoomsProps) {
  const [roomService] = useState(new RoomService());
  const [rooms, setRooms] = useState<IRoom[]>();
  const [deleteSelections, setDeleteSelections] = useState({});
  const [joinSelections, setJoinSelections] = useState({});
  const authContext = useContext(AuthContext);

  async function getAllRooms() {
    try {
      const resp = await roomService.getAll();
      setRooms(resp);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllWithoutRoomsByUserId() {
    try {
      const userId = authContext?.user?._id;
      if (!userId) return;
      const resp = await roomService.getWithoutByUserId(userId);
      setRooms(resp);
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = () => {
    if (variant === "admin") {
      getAllRooms();
    } else {
      getAllWithoutRoomsByUserId();
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const columnsConfigAdmin = columnRoomAdmin({
    deleteSelections,
    setDeleteSelections,
  });

  const columnsConfig = columnRoom({
    joinSelections,
    setJoinSelections,
  });

  return (
    <div className="container px-6 py-10">
      {variant === "admin" ? (
        <DataTableRoom
          setDeleteSelections={setDeleteSelections}
          deleteSelections={deleteSelections}
          refresh={refresh}
          columns={columnsConfigAdmin}
          data={rooms ?? []}
        />
      ) : (
        <DataTableRoom
          joinSelections={joinSelections}
          setJoinSelections={setJoinSelections}
          refresh={refresh}
          columns={columnsConfig}
          data={rooms ?? []}
        />
      )}
    </div>
  );
}
export default ListRooms;
