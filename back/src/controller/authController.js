const bcrypt = require('bcryptjs');
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
            return res.status(401).json({ message: "Identifiants incorrects" });
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
            return res.status(200).json({ message: "Utilisateur non trouvé" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};


