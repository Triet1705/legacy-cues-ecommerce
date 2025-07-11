const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file upload" });
    }
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "legacy-cues",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(req.file.buffer);
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Upload error", error);
    res.status(500).json({ message: "Server error during upload" });
  }
};
module.exports = { uploadImage };
