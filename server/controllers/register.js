const User = require("../models/User");
const bcrypt = require("bcryptjs");
const joi = require("joi");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate user input
    const { error: validationError } = validateUser(req.body);
    if (validationError) {
      const error = new Error(validationError.details[0].message);
      error.statusCode = 400;
      throw error;
    }

    const formatedName = name.toLowerCase();
    const formatedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: formatedEmail });
    if (existingUser) {
      const error = new Error("This email is already registered.");
      error.statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name: formatedName,
      email: formatedEmail,
      password: hashedPassword,
    });

    await newUser.save();

    // Return success response
    res.status(200).json({ message: "User registered successfully", status: true });

  } catch (error) {
    next(error);
  }
};

module.exports = register;

// Input validation using Joi
function validateUser(data) {
  const userSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(12).required(),
  });

  return userSchema.validate(data);
}
