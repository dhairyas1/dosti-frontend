const express = require("express");
const { check, body } = require("express-validator");
const extractToken = require("../middleware/extractToken");
const isAuth = require("../middleware/is-auth");
const isUserAuth = require("../middleware/is-user-auth");
const authController = require("../controllers/auth");

const router = express.Router();

// PUT signup/
router.put(
  "/signup",
  [
    check("email").isEmail().withMessage("Please enter a valid email."),
    body("password").trim().isLength({ min: 5 })
  ],
  authController.signup
);

// POST login
router.post("/login", authController.login);

// POST Logout
router.post("/logout", extractToken, authController.logout);

module.exports = router;
