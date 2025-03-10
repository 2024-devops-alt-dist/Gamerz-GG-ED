const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(200).json({ message: 'Accès non autorisé' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(200).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware;
