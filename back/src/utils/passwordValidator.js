const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{11,}$/;

const validatePassword = (password) => {
    return passwordRegex.test(password);
};

module.exports = { validatePassword };
