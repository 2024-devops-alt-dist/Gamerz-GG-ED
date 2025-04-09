const Room = require("../models/Room");

const findRoomById = async (roomId) => {
  return Room.findById(roomId)
    .populate("createdBy", "username")
    .populate("users", "username");
};

exports.createRoom = async (req, res) => {
  try {
    const { game } = req.body;
    const userId = req.user.id;

    const newRoom = new Room({
      game,
      createdBy: userId,
      users: [userId],
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const filter = req.query.game ? { game: req.query.game } : {};
    const rooms = await Room.find(filter).populate("users", "username");
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await findRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: "Salon non trouvé" });

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinRoom = async (req, res) => {
  try {
    const room = await findRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: "Salon non trouvé" });

    if (room.users.includes(req.user.id)) {
      return res.status(400).json({ message: "Vous êtes déjà dans ce salon" });
    }

    room.users.push(req.user.id);
    await room.save();

    res.status(200).json({ message: "Vous avez rejoint le salon", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.leaveRoom = async (req, res) => {
  try {
    const room = await findRoomById(req.params.id);
    if (!room) return res.status(404).json({ message: "Salon non trouvé" });

    if (!room.users.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "Vous n'êtes pas membre de ce salon" });
    }

    room.users = room.users.filter((user) => user.toString() !== req.user.id);

    if (room.createdBy.toString() === req.user.id) {
      await Room.findByIdAndDelete(req.params.id);
      return res
        .status(200)
        .json({ message: "Salon supprimé car l'admin l'a quitté" });
    }

    await room.save();
    res.status(200).json({ message: "Vous avez quitté le salon", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Aucun ID fourni" });
    }

    const rooms = await Room.find({ _id: { $in: ids } });

    const unauthorized = rooms.find(
      (room) => room.createdBy.toString() !== req.user.id
    );

    if (unauthorized) {
      return res.status(403).json({
        message:
          "Accès refusé, vous n'êtes pas l'administrateur de toutes les rooms sélectionnées",
      });
    }

    await Room.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Salons supprimés avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
