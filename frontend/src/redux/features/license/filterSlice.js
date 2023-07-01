import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredLicenses: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_LICENSES(state, action) {
      const { licenses, search } = action.payload;
      const tempLicenses = licenses.filter(
        (license) =>
          license.name.toLowerCase().includes(search.toLowerCase()) ||
          license.category.toLowerCase().includes(search.toLowerCase())
      );

      state.filteredLicenses = tempLicenses;
    },
  },
});

export const { FILTER_LICENSES } = filterSlice.actions;

export const selectFilteredLicenses = (state) => state.filter.filteredLicenses;

export default filterSlice.reducer;
