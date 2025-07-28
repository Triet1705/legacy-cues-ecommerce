const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect, admin } = require("../middleware/authMiddleware");

const {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router
  .route("/")
  .get(getProduct)
  .post(protect, admin, upload.array("images", 5), createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, upload.array("images", 5), updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
