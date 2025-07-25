const Product = require("../models/Product.js");
const cloudinary = require("../config/cloudinary.js");

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      images,
      material,
      weight,
      pin,
      diameter,
      countInStock,
    } = req.body;
    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const uploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "legacy-cues",
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });
        imageUrls.push(uploadResult.secure_url);
      }
    }
    const product = new Product({
      name,
      brand,
      description,
      price,
      images: imageUrls,
      material,
      weight,
      pin,
      diameter,
      countInStock,
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    res.status(500).json({ message: "Server Error" });
    // --------------------------
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    const {
      name,
      brand,
      description,
      price,
      images,
      materiral,
      weight,
      pin,
      diameter,
      countInStock,
    } = req.body;

    let existingImages = product.images || [];
    if (typeof existingImages === "string") {
      existingImages = [existingImages];
    }

    const newImageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "legacy-cues", resource_type: "auto" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        });
      });
      const resolvedUrls = await Promise.all(uploadPromises);
      newImageUrls.push(...resolvedUrls);
    }
    product.name = name || product.name;
    product.brand = brand || product.brand;
    product.description = description || product.description;
    product.price = price || product.price;
    product.weight = weight || product.weight;
    product.material = material || product.material;
    product.pin = pin || product.pin;
    product.diameter = diameter || product.diameter;
    product.countInStock = countInStock || product.countInStock;

    product.images = [...existingImages, ...newImageUrls];
    const updateProduct = await product.save();
    res.json(updateProduct);
  } catch (error) {
    console.error("Error updating product: ", error);
    if (error.name === "validationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(",") });
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
