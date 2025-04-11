// import userI from "@/interfaces/userI";
// import UserService from "@/services/UserService";
import { useState } from "react";

import ListUser from "@/pages/admin/components/listUser/ListUser";

interface JoinRoomProps {
  setIsOpen: () => void;
}
const JoinRoom = () => {
  // //   const [users, setUsers] = useState<userI[]>();
  // //   const [userService] = useState(new UserService());

  // //   const fetchUsers = async () => {
  // //     try {
  // //       userService.getAll().then((users) => {
  // //         setUsers(users);
  // //       });
  // //     } catch (error) {
  // //       console.log(error);
  // //     }
  // //   };

  //   useEffect(() => {
  //     // fetchUsers();
  //   }, []);

  return <ListUser variant="" type={"all"} />;
};

export default JoinRoom;
