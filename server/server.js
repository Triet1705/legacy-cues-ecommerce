const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db.js");
const productRoutes = require("./routes/productRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");

const app = express();
const port = process.env.PORT || 5000;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

// --- Hàm khởi động Server ---
const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

// --- Gọi hàm để khởi động toàn bộ hệ thống ---
startServer();
