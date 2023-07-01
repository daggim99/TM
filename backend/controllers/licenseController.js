const asyncHandler = require("express-async-handler");
const License = require("../models/licenseModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create License
const createLicense = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category,
    quantity,
    price,
    description,
    bankName,
    accName,
    accNum,
    tin,
    idnum,
  } = req.body;

  //   Validation
  if (
    !name ||
    !category ||
    !quantity ||
    !price ||
    !description ||
    !bankName ||
    !accName ||
    !accNum ||
    !tin ||
    !idnum
  ) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        // public_id: `TM/${req.file.path}`,
        folder: "TM",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("File could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create License
  const license = await License.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    accName,
    accNum,
    bankName,
    tin,
    idnum,
    image: fileData,
  });

  res.status(201).json(license);
});

// Get all Licenses
const getLicenses = asyncHandler(async (req, res) => {
  const licenses = await License.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(licenses);
});

// Get single license
const getLicense = asyncHandler(async (req, res) => {
  const license = await License.findById(req.params.id);
  // if license doesn't exist
  if (!license) {
    res.status(404);
    throw new Error("License not found");
  }
  // Match license to its user
  if (license.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(license);
});

// Delete License
const deleteLicense = asyncHandler(async (req, res) => {
  const license = await License.findById(req.params.id);
  // if license doesn't exist
  if (!license) {
    res.status(404);
    throw new Error("License not found");
  }
  // Match license to its user
  if (license.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await license.remove();
  res.status(200).json({ message: "License deleted." });
});

// Update License
const updateLicense = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  const { id } = req.params;

  const license = await License.findById(id);

  // if license doesn't exist
  if (!license) {
    res.status(404);
    throw new Error("License not found");
  }
  // Match license to its user
  if (license.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "TM",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update License
  const updatedLicense = await License.findByIdAndUpdate(
    { _id: id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? license?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedLicense);
});

module.exports = {
  createLicense,
  getLicenses,
  getLicense,
  deleteLicense,
  updateLicense,
};
