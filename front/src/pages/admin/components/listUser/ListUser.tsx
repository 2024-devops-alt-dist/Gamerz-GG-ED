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
      console.log(resp);
      setUsers(resp);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTableUsers columns={columns()} data={users ? users : []} />
    </div>
  );
}
export default ListUser;
