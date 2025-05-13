// import userI from "@/interfaces/userI";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { IRoom } from "@/interfaces/IRoom";
type columnRoomProps = {
  deleteSelections: Record<string, boolean>;
  setDeleteSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};
export const columnRoomAdmin = ({
  deleteSelections,
  setDeleteSelections,
}: columnRoomProps): ColumnDef<IRoom>[] => {
  const hasSelectionElsewhere = (
    currentKey: "delete",
    selections: {
      delete: Record<string, boolean>;
    }
  ): boolean => {
    return Object.entries(selections)
      .filter(([key]) => key !== currentKey)
      .some(([_, value]) => Object.keys(value).length > 0);
  };

  return [
    {
      accessorKey: "game",
      header: "Game",
    },
    {
      accessorKey: "users",
      header: "Users",
      cell({ row }) {
        return (
          <ul key={row.original.game}>
            {row.original.users &&
              row.original.users.map((u) => {
                console.log(u._id);
                return <li key={u._id}>{u.username}</li>;
              })}
          </ul>
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
              disabled={hasSelectionElsewhere("delete", {
                delete: deleteSelections,
              })}
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
              disabled={hasSelectionElsewhere("delete", {
                delete: deleteSelections,
              })}
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
  table: Row<IRoom>[]
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
  row: Row<IRoom>
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
