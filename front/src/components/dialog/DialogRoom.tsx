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
import { useRoomContext } from "@/context/RoomContext";
import { IRoom } from "@/interfaces/IRoom";
import RoomService from "@/services/roomService";
import { useState } from "react";

interface DialogRoomProps {
  type: "destruct" | "join";
  rooms: IRoom[];
  refresh: () => void;
  setSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}
const DialogRoom = ({
  type,
  rooms: rooms,
  refresh,
  setSelections,
}: DialogRoomProps) => {
  const [roomService] = useState(new RoomService());
  const { refreshRooms } = useRoomContext();

  const onSubmit = () => {
    try {
      const ids: string[] = rooms
        .map((room) => room._id)
        .filter((id) => id !== undefined);

      if (type === "destruct") {
        roomService.deleteByIds(ids).then((resp) => {
          console.log(resp);
          refresh();
          setSelections({});
          refreshRooms();
        });
      } else {
        roomService.joinRooms(ids).then((resp) => {
          console.log(resp);
          refresh();
          setSelections({});
          refreshRooms();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{type === "destruct" ? "Suppression" : "Rejoindre"}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes vous sur de vouloir{" "}
            {type === "destruct" ? "supprimmer" : "rejoindre"} :
            {Array.isArray(rooms) && rooms.length > 0 ? (
              rooms.map((room) => <p key={room.game}>{room.game}</p>)
            ) : (
              <p>Aucun salons sélectionné</p>
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
export default DialogRoom;
