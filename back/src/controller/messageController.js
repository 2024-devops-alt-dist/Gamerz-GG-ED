const Message = require("../models/Message");
const Room = require("../models/Room");

exports.sendMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const { roomId } = req.params;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Salon non trouvé" });

        if (!room.users.includes(req.user.id)) {
            return res
                .status(403)
                .json({ message: "Vous devez rejoindre ce salon avant d'envoyer un message" });
        }

        const newMessage = new Message({
            roomId,
            senderId: req.user.id,
            content,
        });

        await newMessage.save();

        const populatedMessage = await newMessage.populate("senderId", "username");

        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;

        const room = await Room.findById(roomId);
        if (!room) return res.status(404).json({ message: "Salon non trouvé" });

        const messages = await Message.find({ roomId })
            .populate("senderId", "username")
            .sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
