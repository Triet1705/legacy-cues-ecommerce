const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);

module.exports = router;
