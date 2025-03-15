const Room = require("../models/Room");

const isRoomOwner = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: "Salon non trouvé" });

        if (room.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Accès refusé, vous n'êtes pas l'administrateur du salon" });
        }

        req.room = room;
        next();
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la vérification des droits", error });
    }
};

module.exports = isRoomOwner;
