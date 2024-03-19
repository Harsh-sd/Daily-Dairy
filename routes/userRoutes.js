
const userController = require("../controllers/userController");
const express = require("express");
const {body}=require("express-validator");
const User = require("../models/user");
const router = express.Router();

// Route for user sign up the user



router.post("/signup", [
    body("email")
        .isEmail()
        .normalizeEmail() // Place normalizeEmail before other validations
        .custom(async (value, { req }) => {
            const user = await User.findOne({ email: value });
            if (user) {
                return Promise.reject("Email already exists");
            }
        }),
    body("password")
        .trim()
        .isLength({ min: 5 }),
    body("name")
        .trim()
        .isLength({ min: 3 })
], userController.signup);

//Route for login up the user
router.post("/login", userController.login);
module.exports = router;