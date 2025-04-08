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
import { useState } from "react";
import AdminService from "@/services/adminService";
import { Button } from "@/components/ui/button";
import DialogBanned from "../DialogBanned";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refreash: () => void;
  setStatusSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  statusSelections: Record<string, boolean>;
  setBanedSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  banedSelections: Record<string, boolean>;
}
const DataTableUsers = <TData, TValue>({
  data,
  columns,
  refreash,
  statusSelections,
  setStatusSelections,
  banedSelections,
  setBanedSelections,
}: DataTableProps<TData, TValue>) => {
  const [adminService] = useState(new AdminService());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      statusSelections,
      setStatusSelections,
      banedSelections,
      setBanedSelections,
    },
  });

  const onValidate = () => {
    const tableRows = table.getRowModel().rows;

    const selectedUsers = tableRows
      .filter((row) => statusSelections[row.id])
      .map((row) => row.original);

    const ids = selectedUsers.map((user) => user._id);
    console.log(ids);

    if (ids.length === 0) return;
    try {
      adminService.validate(ids).then(() => {
        refreash();
        setStatusSelections({});
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onBanned = () => {
    const tableRows = table.getRowModel().rows;

    const selectedUsers = tableRows
      .filter((row) => banedSelections[row.id])
      .map((row) => row.original);

    const ids = selectedUsers.map((user) => user);
    if (ids.length === 0) return;

    return ids;
  };

  return (
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
        {Object.keys(statusSelections).length > 0 && (
          <Button disabled={data.length <= 0} onClick={onValidate}>
            Approuver
          </Button>
        )}
        {Object.keys(banedSelections).length > 0 && (
          // <Button disabled={data.length <= 0} onClick={onBanned}>
          // </Button>
          <DialogBanned
            setBanedSelections={setBanedSelections}
            refreash={refreash}
            users={onBanned()}
          />
        )}
      </div>
    </div>
  );
};

export default DataTableUsers;
