const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gamerz";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB connecté !");
    } catch (error) {
        console.error("❌ Erreur de connexion à MongoDB :", error);
        process.exit(1);
    }
};

module.exports = connectDB;
