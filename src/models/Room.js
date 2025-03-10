const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    game: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Room", RoomSchema);
