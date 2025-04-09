const mongoose = require("mongoose");
const Message = require("../src/models/Message");

function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log("🟢 Client connecté :", socket.id);

        socket.on("joinRoom", ({ roomId, userId }) => {
            socket.join(roomId);
            console.log(`🧑‍🚀 ${userId} a rejoint la room ${roomId}`);
        });

        socket.on("sendMessage", async ({ roomId, userId, content }) => {
            try {
                const message = await Message.create({
                    roomId: new mongoose.Types.ObjectId(roomId),
                    senderId: new mongoose.Types.ObjectId(userId),
                    content,
                });

                const populatedMessage = await message.populate("senderId", "username");

                io.to(roomId).emit("newMessage", populatedMessage);
            } catch (err) {
                console.error("❌ Erreur lors de l'envoi du message :", err);
            }
        });

        socket.on("disconnect", () => {
            console.log("🔴 Déconnexion :", socket.id);
        });
    });
}

module.exports = socketHandler;
