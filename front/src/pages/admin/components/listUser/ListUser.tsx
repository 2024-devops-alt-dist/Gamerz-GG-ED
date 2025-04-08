import { useEffect, useState } from "react";
import DataTableUsers from "./DataTableUsers";
import UserService from "@/services/UserService";
import userI from "@/interfaces/userI";
import { columns } from "./Column";

function ListUser() {
  const [userService] = useState(new UserService());
  const [users, setUsers] = useState<userI[] | null>([]);

  async function getAllUsers() {
    try {
      const resp = await userService.getAll();
      const usersApproved = resp?.filter((user) => user.status === "approved");
      if (usersApproved) setUsers(usersApproved);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTableUsers
        type={"approved"}
        refreash={getAllUsers}
        columns={columns()}
        data={users ? users : []}
      />
    </div>
  );
}
export default ListUser;
