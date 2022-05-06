import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  features: [],
  loading: false,
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    replaceAllFeatures: (state, action) => {
      state.features = action.payload;
    },
    addFeature: (state, action) => {
      state.features.push(action.payload);
    },
    removeFeature: (state, action) => {
      const index = state.features.findIndex(
        (feat) => feat.id === action.payload
      );
      if (index >= 0) {
        state.features.splice(index, 1);
      }
    },
    updateFeature: (state, action) => {
      state.features = state.features.filter(
        (feat) => feat.id !== action.payload.id
      );
    },

    toggleFeatureLoading: (state, action) => {
      state.loading = action.payload || false;
    },
  },
});

export const {
  replaceAllFeatures,
  addFeature,
  updateFeature,
  removeFeature,
  toggleFeatureLoading,
} = featuresSlice.actions;

export default featuresSlice.reducer;
