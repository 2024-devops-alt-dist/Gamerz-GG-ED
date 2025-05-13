import { IRoom } from "@/interfaces/IRoom";
import RoomService from "@/services/roomService";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface RoomProviderProps {
  children: ReactNode;
}

interface RoomContextType {
  rooms: IRoom[];
  refreshRooms: () => void;
}

const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const roomService = new RoomService();
  const authContext = useAuth();

  const refreshRooms = async () => {
    try {
      const userId = authContext?.user?._id;
      if (!userId) {
        console.warn("RoomProvider → Aucun utilisateur connecté");
        return;
      }

      const res = await roomService.getByUserId(userId);
      setRooms(res);
    } catch (err) {
      console.error("Erreur chargement des rooms", err);
    }
  };

  useEffect(() => {
    if (authContext?.user?._id) {
      refreshRooms();
    }
  }, [authContext?.user?._id]);

  return (
    <RoomContext.Provider value={{ rooms, refreshRooms }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext doit être utilisé dans un RoomProvider");
  }
  return context;
};
