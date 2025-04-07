const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gamerz";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connecté !");

        await ensureCollectionsExist();
    } catch (error) {
        console.error("❌ Erreur de connexion à MongoDB :", error);
        process.exit(1);
    }
};

const ensureCollectionsExist = async () => {
    const User = require("../models/User");
    const Room = require("../models/Room");
    const Message = require("../models/Message");

    // Cree la table et insert une donnee
    let adminUser = await User.findOne();
    if (!adminUser) {
        adminUser = await User.create({
            username: "test",
            email: "test@test.com",
            password: "test123!!!",
            role: "user",
            status: "approved",
            motivation: "je veux entrer",
        });
        console.log(" table User créé ");
    }

    // Cree la table et insert une donnee
    if (!(await Room.exists({}))) {
        await Room.create({
            game: "TestGame",
            createdBy: adminUser._id,
            users: [adminUser._id]
        });
        console.log("table rooms créée ");
    }

    // Cree la table et insert une donnee
    let testRoom = await Room.findOne();
    if (!(await Message.exists({}))) {
        await Message.create({
            roomId: testRoom._id,
            senderId: adminUser._id,
            content: "test"
        });
        console.log("table messages créée ");
    }
}
module.exports = connectDB;
