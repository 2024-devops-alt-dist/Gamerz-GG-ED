/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
// import DataTableUsers from "../dataTable/dataTableUsers/DataTableUsers";
// import { columns } from "../dataTable/dataTableUsers/Column";
import IRoom from "@/interfaces/IRoom";
import RoomService from "@/services/roomService";
import { columnRoom } from "../dataTable/dataTableRooms/ColumnRoom";
import DataTableRoom from "../dataTable/dataTableRooms/DataTableRoom";

interface ListRoomsProps {
  variant?: "admin" | "";
}

function ListRooms({ variant = "admin" }: ListRoomsProps) {
  const [roomService] = useState(new RoomService());
  const [rooms, setRooms] = useState<IRoom[] | []>([]);
  const [deleteSelections, setDeleteSelections] = useState({});

  async function getAllRooms() {
    try {
      const resp = await roomService.getAll();
      setRooms(resp);
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = () => {
    getAllRooms();
  };

  useEffect(() => {
    refresh();
  }, []);

  const columnsConfig = columnRoom({
    deleteSelections,
    setDeleteSelections,
  });

  return (
    <div className="container mx-auto py-10">
      <DataTableRoom
        setDeleteSelections={setDeleteSelections}
        deleteSelections={deleteSelections}
        refresh={refresh}
        columns={columnsConfig}
        data={rooms}
      />
    </div>
  );
}
export default ListRooms;
