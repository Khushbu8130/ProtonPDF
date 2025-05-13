const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const formattedEmail = email.toLowerCase();

        const foundUser = await User.findOne({ email: formattedEmail });
        if (!foundUser) {
            const error = new Error("No user found");
            error.statusCode = 400;
            throw error;
        }

        const isPassMatch = await bcrypt.compare(password, foundUser.password);
        if (!isPassMatch) {
            const error = new Error("Incorrect password");
            error.statusCode = 400;
            throw error;
        }

        const accessToken = jwt.sign(
            { email: formattedEmail, userId: foundUser._id },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: "7d" }
        );

        res.status(200).json({ message: "Login Successfully", status: true, token: accessToken });
    } catch (error) {
        next(error);
    }
};

module.exports = login;
