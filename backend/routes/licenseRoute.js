const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const {
  createLicense,
  getLicenses,
  getLicense,
  deleteLicense,
  updateLicense,
} = require("../controllers/licenseController");
const { upload } = require("../utils/fileUpload");

router.post("/", protect, upload.single("image"), createLicense);
router.patch("/:id", protect, upload.single("image"), updateLicense);
router.get("/", protect, getLicenses);
router.get("/:id", protect, getLicense);
router.delete("/:id", protect, deleteLicense);

module.exports = router;
