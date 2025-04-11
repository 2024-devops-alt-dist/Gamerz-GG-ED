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
import { Button } from "@/components/ui/button";
import userI from "@/interfaces/userI";
import AdminService from "@/services/adminService";
import { useState } from "react";

interface DialogDestructUserProps {
  actionType: "ban" | "delete";
  users: userI[];
  refresh: () => void;
  setSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
const DialogDestructUser = ({
  actionType,
  users,
  refresh,
  setSelections,
}: DialogDestructUserProps) => {
  const [adminService] = useState(new AdminService());

  const onSubmit = () => {
    const ids = users.map((user) => user._id);
    try {
      if (actionType === "ban") {
        adminService.banned(ids).then(() => {
          refresh();
          setSelections({});
        });
      } else {
        adminService.deleteByIds(ids).then(() => {
          refresh();
          setSelections({});
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{actionType === "ban" ? "Bannissement" : "Suppression"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes vous sur de vouloir
            {actionType === "ban" ? " bannir" : " supprimer"} :
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => <p key={user.email}>{user.email}</p>)
            ) : (
              <p>Aucun utilisateur sélectionné</p>
            )}
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
export default DialogDestructUser;
