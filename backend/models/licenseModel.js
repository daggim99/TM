const mongoose = require("mongoose");

const licenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: "SKU",
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    quantity: {
      type: String,
      required: [true, "Please add a TIN Number"],
      trim: true,
    },
    tin: {
      type: String,
      required: [true, "Please add a TIN Number"],
      trim: true,
    },

    idnum: {
      type: String,
      required: [true, "Please add a ID Number"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    image: {
      type: Object,
      default: {},
    },

    bankName: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },

    accName: {
      type: String,
      required: [true, "Please add a name of bank"],
      trim: true,
    },

    accNum: {
      type: String,
      required: [true, "Please add a name of bank account"],
      trim: true,
    },

    price: {
      type: String,
      required: [true, "Please add a the price for the license"],
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

const License = mongoose.model("License", licenseSchema);
module.exports = License;
