/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import DataTableUsers from "../dataTable/dataTableUsers/DataTableUsers";
import UserService from "@/services/UserService";
import userI from "@/interfaces/userI";
import { ListUserType } from "@/interfaces/Iglobal";
import { columnDefaut } from "../dataTable/dataTableUsers/ColumnDefaut";

interface ListUserProps {
  type: ListUserType;
  variant?: "defaut" | "";
}

function ListUser({ type, variant = "defaut" }: ListUserProps) {
  const [userService] = useState(new UserService());
  const [users, setUsers] = useState<userI[] | null>([]);
  const [usersPending, setUsersPending] = useState<userI[] | null>([]);
  const [deleteSelections, setDeleteSelections] = useState({});
  const [statusSelections, setStatusSelections] = useState({});
  const [banedSelections, setBanedSelections] = useState<
    Record<string, boolean>
  >({});

  async function getAllUsers() {
    try {
      const resp = await userService.getAll();
      const usersApproved = resp?.filter((user) => user.status === "approved");
      if (usersApproved) {
        setUsers(usersApproved);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllUsersByStatusPending() {
    try {
      const resp = await userService.getByStatusPending();
      setUsersPending(resp);
    } catch (error) {
      console.log(error);
    }
  }
  const refresh = () => {
    type === "all" ? getAllUsers() : getAllUsersByStatusPending();
  };

  useEffect(() => {
    if (type === "all") getAllUsers();
    else if (type === "pending") getAllUsersByStatusPending();
    else return;
  }, [type]);

  const columnsConfigDefaut = columnDefaut({
    statusSelections,
    setStatusSelections,
    banedSelections,
    setBanedSelections,
    deleteSelections,
    setDeleteSelections,
  });
  return (
    <div className="container mx-auto py-10">
      <DataTableUsers
        setDeleteSelections={setDeleteSelections}
        deleteSelections={deleteSelections}
        setBanedSelections={setBanedSelections}
        banedSelections={banedSelections}
        statusSelections={statusSelections}
        setStatusSelections={setStatusSelections}
        refresh={refresh}
        columns={columnsConfigDefaut}
        data={
          type === "all" && users
            ? users
            : type === "pending" && usersPending
            ? usersPending
            : []
        }
      />
    </div>
  );
}
export default ListUser;
