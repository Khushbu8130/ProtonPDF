const User = require("../models/User");
const crypto = require('crypto');
const sendMail = require('../utils/sendMail')

const forgetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const formatedEmail = email.toLowerCase();
        const findUser = await User.findOne({ email: formatedEmail });

        if (!findUser) {
            const error = new Error("No user found");
            error.statusCode = 400;
            throw error;
        }

        // Optional: block re-request within short time
        if (
            findUser.otp?.otp &&
            new Date(findUser.otp.sendTime).getTime() > new Date().getTime()
        ) {
            const error = new Error(
                `Please wait until ${new Date(findUser.otp.sendTime).toLocaleTimeString()}`
            );
            error.statusCode = 400;
            throw error;
        }

        const otp = Math.floor(Math.random() * 900000) + 100000; // 6-digit OTP
        const token = crypto.randomBytes(32).toString("hex");


        findUser.otp.otp = otp;
        findUser.otp.sendTime = new Date().getTime() + 1 * 60 * 1000;
        findUser.otp.token = token;

        await findUser.save();
        sendMail(otp, formatedEmail);

        // console.log("Generated token:", token); // ✅ Now you’ll see this
        res.status(200).json({ message: "Please check your email for OTP", status: true, token });
    } catch (error) {
        next(error);
    }
};

module.exports = forgetPassword;
