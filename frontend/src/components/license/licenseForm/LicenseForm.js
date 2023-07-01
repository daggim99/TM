import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./LicenseForm.scss";

const LicenseForm = ({
  license,
  licenseImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveLicense,
}) => {
  return (
    <div className="add-license">
      <Card cardClass={"card"}>
        <form onSubmit={saveLicense}>
          <Card cardClass={"group"}>
            <label>License Information File</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="license" />
              </div>
            ) : (
              <p>No image set for this License.</p>
            )}
          </Card>
          <Card cardClass={"group"}>
            <label>License Name:</label>
            <input
              type="text"
              placeholder="License name"
              name="name"
              value={license?.name}
              onChange={handleInputChange}
            />

            <label>License Category:</label>
            <input
              type="text"
              placeholder="License Category"
              name="category"
              value={license?.category}
              onChange={handleInputChange}
            />

            <label>License Duration:</label>
            <input
              type="text"
              placeholder="License Duration"
              name="quantity"
              value={license?.quantity}
              onChange={handleInputChange}
            />

            <label>TIN Number:</label>
            <input
              type="text"
              placeholder="TIN Number"
              name="tin"
              value={license?.tin}
              onChange={handleInputChange}
            />

            <label>ID Number:</label>
            <input
              type="text"
              placeholder="ID Number"
              name="idnum"
              value={license?.idnum}
              onChange={handleInputChange}
            />
          </Card>
          <Card cardClass={"group"}>
            <h1>Payment Information</h1>

            <label>Bank Name:</label>
            <input
              type="text"
              placeholder="Bank Name"
              name="bankName"
              value={license?.bankName}
              onChange={handleInputChange}
            />

            <label>Bank Account Holder Name:</label>
            <input
              type="text"
              placeholder="Bank Account Holder Name"
              name="accName"
              value={license?.accName}
              onChange={handleInputChange}
            />

            <label>Bank Account Number:</label>
            <input
              type="text"
              placeholder="Bank Account Number"
              name="accNum"
              value={license?.accNum}
              onChange={handleInputChange}
            />

            <label>Price:</label>
            <input
              type="text"
              placeholder="License Price"
              name="price"
              value={license?.price}
              onChange={handleInputChange}
            />
          </Card>
          <label>License Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={LicenseForm.modules}
            formats={LicenseForm.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save License
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

LicenseForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
LicenseForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default LicenseForm;
