import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import LicenseForm from "../../components/license/licenseForm/LicenseForm";
import {
  createLicense,
  selectIsLoading,
} from "../../redux/features/license/licenseSlice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  tin: "",
  idnum: "",
  bankName: "",
  accName: "",
  accNum: "",
};

const AddLicense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [license, setLicense] = useState(initialState);
  const [licenseImage, setLicenseImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const {
    name,
    category,
    price,
    quantity,
    tin,
    idnum,
    bankName,
    accName,
    accNum,
  } = license;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLicense({ ...license, [name]: value });
  };

  const handleImageChange = (e) => {
    setLicenseImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateKSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveLicense = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateKSKU(category));
    formData.append("category", category);
    formData.append("quantity", Number(quantity));
    formData.append("price", price);
    formData.append("tin", tin);
    formData.append("idnum", idnum);
    formData.append("bankName", bankName);
    formData.append("accName", accName);
    formData.append("accNum", accNum);
    formData.append("description", description);
    formData.append("image", licenseImage);

    console.log(...formData);

    await dispatch(createLicense(formData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New License</h3>
      <LicenseForm
        license={license}
        licenseImage={licenseImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveLicense={saveLicense}
      />
    </div>
  );
};

export default AddLicense;
