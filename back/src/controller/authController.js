const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            status: "pending"
        });

        res.status(201).json({
            message: "Inscription réussie, en attente de validation",
            user: { id: newUser._id, username: newUser.username, email: newUser.email, status: newUser.status }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(200).json({ message: "Identifiants incorrects" });
        }

        if (user.status === "pending") {
            return res.status(403).json({ message: "Compte en attente de validation par un administrateur" });
        }

        if (user.status === "banned") {
            return res.status(403).json({ message: "Compte banni. Contactez un administrateur." });
        }

       const token = generateToken(res, user);
        res.json({ message: "Connexion réussie",
            token: token ,
            user: { username: user.username, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.logout = (req, res) => {
    res.clearCookie('token').json({message: "Déconnexion réussie"});
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const { username, email } = req.body;
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        res.json({ message: "Profil mis à jour avec succès", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Ancien mot de passe incorrect" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.refreshToken = (req, res) => {
    const token = req.cookies.token;

    console.log("🔹 Token reçu :", token);

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        generateToken(res, { id: decoded.id, role: decoded.role });

        res.json({ message: "Token rafraîchi avec succès" });
    } catch (error) {
        console.error("❌ Erreur lors du rafraîchissement du token :", error.message);
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};
