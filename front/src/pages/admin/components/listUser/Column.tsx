import userI from "@/interfaces/userI";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
type columnsProps = {
  statusSelections: Record<string, boolean>;
  setStatusSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  banedSelections: Record<string, boolean>;
  setBanedSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;

  deleteSelections: Record<string, boolean>;
  setDeleteSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};
export const columns = ({
  statusSelections,
  setStatusSelections,
  banedSelections,
  setBanedSelections,
  deleteSelections,
  setDeleteSelections,
}: columnsProps): ColumnDef<userI>[] => {
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
        const pendingRows = table
          .getRowModel()
          .rows.filter((row) => row.original.status === "pending");
        const isChecked = getSelectValues(statusSelections, pendingRows);

        return (
          <div className="flex gap-2 items-center">
            <h4>Statut</h4>
            {pendingRows.length > 0 && (
              <Checkbox
                checked={isChecked}
                onCheckedChange={(value) => {
                  pendingRows.forEach((row) => {
                    getSelectValue(setStatusSelections, value, row);
                  });
                }}
              />
            )}
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {row.original.status}
            {row.original.status === "pending" && (
              <Checkbox
                checked={!!statusSelections[row.id]}
                onCheckedChange={(value) => {
                  getSelectValue(setStatusSelections, value, row);
                }}
                aria-label="Select row"
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "baned",
      id: "baned",
      header: ({ table }) => {
        const bannedRows = table.getRowModel().rows.map((row) => row);
        const isChecked = getSelectValues(banedSelections, bannedRows);

        return (
          <div className="flex gap-2">
            <h4>Banissement</h4>
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) => {
                bannedRows.forEach((row) => {
                  getSelectValue(setBanedSelections, value, row);
                });
              }}
              aria-label="Select all"
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Checkbox
              checked={!!banedSelections[row.id]}
              onCheckedChange={(value) => {
                getSelectValue(setBanedSelections, value, row);
              }}
              aria-label="Select row"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "delete",
      id: "delete",
      header: ({ table }) => {
        const deleteRows = table.getRowModel().rows.map((row) => row);
        const isChecked = getSelectValues(deleteSelections, deleteRows);

        return (
          <div className="flex gap-2">
            <h4>Suppression</h4>
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) => {
                deleteRows.forEach((row) => {
                  getSelectValue(setDeleteSelections, value, row);
                });
              }}
              aria-label="Select all"
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Checkbox
              checked={!!deleteSelections[row.id]}
              onCheckedChange={(value) => {
                getSelectValue(setDeleteSelections, value, row);
              }}
              aria-label="Select row"
            />
          </div>
        );
      },
    },
  ];
};

const getSelectValues = (
  selections: Record<string, boolean>,
  table: Row<userI>[]
): boolean | "indeterminate" => {
  const allSelected =
    table.length > 0 && table.every((row) => selections[row.id]);
  const someSelected = table.some((row) => selections[row.id]);
  if (allSelected) return true;
  else if (someSelected) return "indeterminate";
  else return false;
};
const getSelectValue = (
  setSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  value: CheckedState,
  row: Row<userI>
) => {
  setSelections((prev: Record<string, boolean>) => {
    const updateBan = { ...prev };
    if (value) {
      updateBan[row.id] = true;
    } else {
      delete updateBan[row.id];
    }
    return updateBan;
  });
};
