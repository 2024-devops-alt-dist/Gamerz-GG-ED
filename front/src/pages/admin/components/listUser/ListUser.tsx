import { useEffect, useState } from "react";
import DataTableUsers from "./DataTableUsers";
import UserService from "@/services/UserService";
import userI from "@/interfaces/userI";
import { columns } from "./Column";
import { ListUserType } from "@/interfaces/Iglobal";

interface ListUserProps {
  type: ListUserType;
}

function ListUser({ type }: ListUserProps) {
  const [userService] = useState(new UserService());
  const [users, setUsers] = useState<userI[] | null>([]);
  const [usersPending, setUsersPending] = useState<userI[] | null>([]);
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
  useEffect(() => {
    if (type === "all") getAllUsers();
    else if (type === "pending") getAllUsersByStatusPending();
    else return;
  }, [type]);
  const columnsConfig = columns({
    statusSelections,
    setStatusSelections,
    banedSelections,
    setBanedSelections,
  });
  return (
    <div className="container mx-auto py-10">
      <DataTableUsers
        setBanedSelections={setBanedSelections}
        banedSelections={banedSelections}
        statusSelections={statusSelections}
        setStatusSelections={setStatusSelections}
        refreash={users ? getAllUsers : getAllUsersByStatusPending}
        columns={columnsConfig}
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
