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
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  type: string;
  refreash: () => void;
}
const DataTableUsers = <TData, TValue>({
  data,
  columns,
  refreash,
  type,
}: DataTableProps<TData, TValue>) => {
  console.log("columns", columns);

  const [rowSelection, setRowSelection] = useState({});
  const [adminService] = useState(new AdminService());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const onSubmit = () => {
    console.log(data);

    const selectedIndexes = Object.keys(rowSelection);
    const selectedUsers = selectedIndexes
      .map((index) => data[parseInt(index)])
      .filter(Boolean);
    console.log(selectedUsers);
    const ids = selectedUsers.map((i) => {
      console.log("i._id", i._id);
      return i._id;
    });
    if (ids.length === 0) return;
    try {
      adminService.validate(ids).then(() => {
        refreash();
        setRowSelection({});
      });
    } catch (error) {
      console.log(error);
    }
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
        {type === "pending" && (
          <Button disabled={data.length <= 0} onClick={onSubmit}>
            Approuver
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataTableUsers;
