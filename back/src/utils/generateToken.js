const jwt = require('jsonwebtoken');

const generateToken = (res, user) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000
    });

    return token;
};

module.exports = generateToken;
