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
      header: ({ table }) => (
        <>
          Status
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
        </>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
  ];
};
