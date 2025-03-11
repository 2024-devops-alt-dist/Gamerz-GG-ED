const roleMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Accès réservé aux admin" });
    }
    next();
};

module.exports = roleMiddleware;
