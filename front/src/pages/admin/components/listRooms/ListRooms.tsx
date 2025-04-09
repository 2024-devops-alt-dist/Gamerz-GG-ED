/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
// import DataTableUsers from "../dataTable/dataTableUsers/DataTableUsers";
// import { columns } from "../dataTable/dataTableUsers/Column";
import IRoom from "@/interfaces/IRoom";
import RoomService from "@/services/roomService";
import { columnRoom } from "../dataTable/dataTableRooms/ColumnRoom";
import DataTableRoom from "../dataTable/dataTableRooms/DataTableRoom";

function ListRooms() {
  const [roomService] = useState(new RoomService());
  const [rooms, setRooms] = useState<IRoom[] | []>([]);
  const [deleteSelections, setDeleteSelections] = useState({});

  async function getAllRooms() {
    try {
      const resp = await roomService.getAll();
      setRooms(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = () => {
    getAllRooms();
  };

  useEffect(() => {
    getAllRooms();
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
