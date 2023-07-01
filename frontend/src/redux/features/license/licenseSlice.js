import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import licenseService from "./licenseService";
import { toast } from "react-toastify";

const initialState = {
  license: null,
  licenses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create New License
export const createLicense = createAsyncThunk(
  "licenses/create",
  async (formData, thunkAPI) => {
    try {
      return await licenseService.createLicense(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all licenses
export const getLicenses = createAsyncThunk(
  "licenses/getAll",
  async (_, thunkAPI) => {
    try {
      return await licenseService.getLicenses();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a License
export const deleteLicense = createAsyncThunk(
  "licenses/delete",
  async (id, thunkAPI) => {
    try {
      return await licenseService.deleteLicense(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get a license
export const getLicense = createAsyncThunk(
  "licenses/getLicense",
  async (id, thunkAPI) => {
    try {
      return await licenseService.getLicense(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update license
export const updateLicense = createAsyncThunk(
  "licenses/updateLicense",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await licenseService.updateLicense(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const licenseSlice = createSlice({
  name: "license",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const licenses = action.payload;
      const array = [];
      licenses.map((item) => {
        const { price, quantity } = item;
        const licenseValue = price * quantity;
        return array.push(licenseValue);
      });
      const totalValue = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalStoreValue = totalValue;
    },
    CALC_OUTOFSTOCK(state, action) {
      const licenses = action.payload;
      const array = [];
      licenses.map((item) => {
        const { quantity } = item;

        return array.push(quantity);
      });
      let count = 0;
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1;
        }
      });
      state.outOfStock = count;
    },
    CALC_CATEGORY(state, action) {
      const licenses = action.payload;
      const array = [];
      licenses.map((item) => {
        const { category } = item;

        return array.push(category);
      });
      const uniqueCategory = [...new Set(array)];
      state.category = uniqueCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLicense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLicense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.licenses.push(action.payload);
        toast.success("License added successfully");
      })
      .addCase(createLicense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getLicenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLicenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.licenses = action.payload;
      })
      .addCase(getLicenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteLicense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLicense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("License deleted successfully");
      })
      .addCase(deleteLicense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getLicense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLicense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.license = action.payload;
      })
      .addCase(getLicense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateLicense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLicense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("License updated successfully");
      })
      .addCase(updateLicense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATEGORY } =
  licenseSlice.actions;

export const selectIsLoading = (state) => state.license.isLoading;
export const selectLicense = (state) => state.license.license;
export const selectTotalStoreValue = (state) => state.license.totalStoreValue;
export const selectOutOfStock = (state) => state.license.outOfStock;
export const selectCategory = (state) => state.license.category;

export default licenseSlice.reducer;
