import { useEffect, useState } from "react";
import DataTableUsers from "./DataTableUsers";
import UserService from "@/services/UserService";
import userI from "@/interfaces/userI";
import { columns } from "./Column";

function ListUserPending() {
  const [userService] = useState(new UserService());
  const [users, setUsers] = useState<userI[] | null>([]);
  const [error, setError] = useState<string>("");

  async function getAllUsers() {
    try {
      const resp = await userService.getByStatusPending();
      console.log(resp);
      setUsers(resp);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  useEffect(() => {
    getAllUsers();
    users?.map((user) => console.log(user));
  }, []);

  return (
    <div className="container mx-auto py-10">
      {error}
      <DataTableUsers
        columns={columns()}
        data={users ? users.filter((user) => user.status === "pending") : []}
      />
    </div>
  );
}
export default ListUserPending;
