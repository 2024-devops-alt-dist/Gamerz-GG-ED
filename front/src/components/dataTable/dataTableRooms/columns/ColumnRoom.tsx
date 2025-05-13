// import userI from "@/interfaces/userI";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { IRoom } from "@/interfaces/IRoom";
type columnRoomProps = {
  joinSelections: Record<string, boolean>;
  setJoinSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};
export const columnRoom = ({
  joinSelections,
  setJoinSelections,
}: columnRoomProps): ColumnDef<IRoom>[] => {
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
      accessorKey: "join",
      id: "join",
      header: ({ table }) => {
        const joinRows = table.getRowModel().rows.map((row) => row);
        const isChecked = getSelectValues(joinSelections, joinRows);

        return (
          <div className="flex gap-2">
            {/* <h4>Salon</h4> */}
            <Checkbox
              checked={isChecked}
              onCheckedChange={(value) => {
                joinRows.forEach((row) => {
                  getSelectValue(setJoinSelections, value, row);
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
              checked={!!joinSelections[row.id]}
              onCheckedChange={(value) => {
                getSelectValue(setJoinSelections, value, row);
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
