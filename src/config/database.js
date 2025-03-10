const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/gamerz";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ MongoDB connecté !");

        // Initialisation des collections
        await initCollections();
    } catch (error) {
        console.error("❌ Erreur de connexion à MongoDB :", error);
        process.exit(1);
    }
};

const initCollections = async () => {
    const db = mongoose.connection;

    // Vérifie si les collections existent déjà
    const collections = await db.db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    if (!collectionNames.includes("users")) {
        await db.createCollection("users");
        console.log("🛠 Collection 'users' créée !");
    }

    if (!collectionNames.includes("rooms")) {
        await db.createCollection("rooms");
        console.log("🛠 Collection 'rooms' créée !");
    }

    if (!collectionNames.includes("messages")) {
        await db.createCollection("messages");
        console.log("🛠 Collection 'messages' créée !");
    }
};

module.exports = connectDB;
