const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { sendValidationEmail } = require("../utils/emailService");

exports.validateUser = async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({ message: "Statut invalide" });
    }

    if (user.status === "approved") {
      return res
        .status(400)
        .json({ message: "L'utilisateur est déjà approuvé" });
    }

    user.status = status;
    await user.save();

    if (status === "approved") {
      await sendValidationEmail(user.email, user.username);
    }

    res.json({ message: `Utilisateur ${status} avec succès` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.status = "banned";
    await user.save();

    res.json({ message: "Utilisateur banni avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure les mots de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Un administrateur existe déjà" });
    }

    const hashedPassword = await bcrypt.hash("admin", 10);
    const admin = await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
      status: "approved",
      motivation: "test",
    });

    res.status(201).json({ message: "Administrateur créé avec succès", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsersPendingStatus = async (req, res) => {
  try {
    const pendingUsers = await User.find(
      { status: "pending" },
      "id username email motivation createdAt"
    );

    if (pendingUsers.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur en attente de validation." });
    }

    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
