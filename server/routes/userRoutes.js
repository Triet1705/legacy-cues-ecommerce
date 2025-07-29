const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  creatUser,
} = require("../controllers/userController");

// PUBLIC
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

//ADMIN
router.route("/").get(protect, admin, getUsers).post(protect, admin, creatUser);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = router;
