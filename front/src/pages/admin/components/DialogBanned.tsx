import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import userI from "@/interfaces/userI";
import AdminService from "@/services/adminService";
import { useState } from "react";

interface DialogBannedProps {
  users: userI[];
  refreash: () => void;
  setBanedSelections: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}
const DialogBanned = ({
  users,
  refreash,
  setBanedSelections,
}: DialogBannedProps) => {
  console.log(users);
  const [adminService] = useState(new AdminService());

  const onSubmit = () => {
    const ids = users.map((user) => user._id);
    try {
      adminService.banned(ids).then((resp) => {
        console.log(resp);

        refreash();
        setBanedSelections({});
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Banissement</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes vous sur de vouloir bannir :{" "}
            {users.map((user) => (
              <p key={user.email}>{user.email}</p>
            ))}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DialogBanned;
