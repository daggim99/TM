import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import LicenseForm from "../../components/license/licenseForm/LicenseForm";
import {
  getLicense,
  getLicenses,
  selectIsLoading,
  selectLicense,
  updateLicense,
} from "../../redux/features/license/licenseSlice";

const EditLicense = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const licenseEdit = useSelector(selectLicense);

  const [license, setLicense] = useState(licenseEdit);
  const [licenseImage, setLicenseImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getLicense(id));
  }, [dispatch, id]);

  useEffect(() => {
    setLicense(licenseEdit);

    setImagePreview(
      licenseEdit && licenseEdit.image ? `${licenseEdit.image.filePath}` : null
    );

    setDescription(
      licenseEdit && licenseEdit.description ? licenseEdit.description : ""
    );
  }, [licenseEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLicense({ ...license, [name]: value });
  };

  const handleImageChange = (e) => {
    setLicenseImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveLicense = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", license?.name);

    formData.append("category", license?.category);
    formData.append("quantity", license?.quantity);
    formData.append("price", license?.price);
    formData.append("description", description);
    if (licenseImage) {
      formData.append("image", licenseImage);
    }

    console.log(...formData);

    await dispatch(updateLicense({ id, formData }));
    await dispatch(getLicenses());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit License</h3>
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

export default EditLicense;
