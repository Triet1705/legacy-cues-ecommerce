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
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      weight,
      images,
      material,
      pin,
      diameter,
      countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.brand = brand;
      product.description = description;
      product.price = price;
      product.weight = weight;
      product.images = images;
      product.material = material;
      product.pin = pin;
      product.diameter = diameter;
      product.countInStock = countInStock;

      const updateProduct = await product.save();

      res.json(updateProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
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
