import axios from "axios";

const BACKEND_URL = "http://localhost:4000";

const API_URL = `${BACKEND_URL}/api/licenses/`;

// Create New License
const createLicense = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all licenses
const getLicenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a License
const deleteLicense = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};
// Get a License
const getLicense = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};
// Update License
const updateLicense = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const licenseService = {
  createLicense,
  getLicenses,
  getLicense,
  deleteLicense,
  updateLicense,
};

export default licenseService;
