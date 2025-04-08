import userI from "@/interfaces/userI";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export const columns = (): ColumnDef<userI>[] => {
  return [
    {
      accessorKey: "username",
      header: "Pseudo",
    },
    {
      accessorKey: "motivation",
      header: "Motivation",
    },
    {
      accessorKey: "status",
      id: "status",
      header: ({ table }) => {
        const isStatusPending = table
          .getRowModel()
          .rows.filter((s) => s.original.status === "pending");
        console.log(isStatusPending.length);

        return (
          <div className="flex gap-2">
            <h4>Statut</h4>
            {isStatusPending.length > 0 && (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
              />
            )}
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="flex gap-2">
          {row.original.status}
          {row.original.status === "pending" && (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => {
                console.log("value checkbox", value);

                return row.toggleSelected(!!value);
              }}
              aria-label="Select row"
            />
          )}
        </div>
      ),
    },
  ];
};
