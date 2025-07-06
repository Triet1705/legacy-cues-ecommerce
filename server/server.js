const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.listen(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LegacyCues Server is running!");
});

app.use("/api/product", productRoutes);

app.listen(port, () => {
  console.log(`Server is listenning on port: ${port}`);
});
