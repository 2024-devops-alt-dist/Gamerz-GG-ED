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
import IRoom from "@/interfaces/IRoom";
import RoomService from "@/services/roomService";
import { useState } from "react";

interface DialogDestructRoomProps {
  rooms: IRoom[];
  refresh: () => void;
  setSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
const DialogDestructRoom = ({
  rooms: rooms,
  refresh,
  setSelections,
}: DialogDestructRoomProps) => {
  const [roomService] = useState(new RoomService());
  console.log(rooms);

  const onSubmit = () => {
    try {
      const ids = rooms.map((room) => room._id);
      if (!ids || ids.length === 0) return;
      roomService.deleteByIds(ids).then((resp) => {
        console.log(resp);
        refresh();
        setSelections({});
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Suppression</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes vous sur de vouloir supprimer :
            {Array.isArray(rooms) && rooms.length > 0 ? (
              rooms.map((room) => <p key={room.game}>{room.game}</p>)
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
export default DialogDestructRoom;
