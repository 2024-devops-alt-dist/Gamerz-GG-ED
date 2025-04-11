import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import RoomForm from "./RoomForm";
import { useContext, useState } from "react";
import DialogRoom from "@/components/dialog/DialogRoom";
import AuthContext from "@/context/AuthContext";

interface DataTableRoomProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refresh: () => void;
  deleteSelections?: Record<string, boolean>;
  setDeleteSelections?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;

  joinSelections?: Record<string, boolean>;
  setJoinSelections?: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}
const DataTableRoom = <TData, TValue>({
  data,
  columns,
  deleteSelections,
  setDeleteSelections,
  joinSelections,
  setJoinSelections,
  refresh,
}: DataTableRoomProps<TData, TValue>) => {
  const [isOnpen, setIsOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      deleteSelections,
      setDeleteSelections,
      joinSelections,
      setJoinSelections,
    },
  });

  const getUsersFromSelection = (selection: Record<string, boolean>) => {
    const tableRows = table.getRowModel().rows;

    const selectedUsers = tableRows
      .filter((row) => selection[row.id])
      .map((row) => row.original);

    const ids = selectedUsers.map((user) => user);
    if (ids.length === 0) return;

    return ids;
  };

  const handleOpenFormCreateRoom = () => {
    setIsOpen(!isOnpen);
  };
  return (
    <div>
      {!isOnpen ? (
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-end mt-4">
            {deleteSelections &&
              setDeleteSelections &&
              Object.keys(deleteSelections).length > 0 && (
                <DialogRoom
                  type="destruct"
                  rooms={getUsersFromSelection(deleteSelections)}
                  refresh={refresh}
                  setSelections={setDeleteSelections}
                />
              )}
            {joinSelections &&
              setJoinSelections &&
              Object.keys(joinSelections).length > 0 && (
                <DialogRoom
                  type="join"
                  rooms={getUsersFromSelection(joinSelections)}
                  refresh={refresh}
                  setSelections={setJoinSelections}
                />
              )}
          </div>
        </div>
      ) : (
        <RoomForm setIsOpen={setIsOpen} refresh={refresh} />
      )}
      <div className="flex pt-3">
        {authContext?.user?.role === "admin" && (
          <Button className="m-auto" onClick={handleOpenFormCreateRoom}>
            Création de salon
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataTableRoom;
