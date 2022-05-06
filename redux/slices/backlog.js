import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backlogs: [],
  loading: false,
};

const backlog = createSlice({
  name: "backlogs",
  initialState,
  reducers: {
    replaceAllBacklogs: (state, action) => {
      state.backlogs = action.payload;
    },
    addBacklog: (state, action) => {
      state.backlogs.push(action.payload);
    },
    updateBacklog: (state, action) => {
      state.backlogs = state.backlogs.map((backlog) =>
        backlog.id === action.payload.id ? action.payload : backlog
      );
    },
    removeBacklog: (state, action) => {
      state.backlogs = state.backlogs.filter(
        (backlog) => backlog.id !== action.payload
      );
    },
    toggleBacklogLoading: (state, action) => {
      state.loading = action.payload || false;
    },
  },
});

export const {
  replaceAllBacklogs,
  addBacklog,
  updateBacklog,
  removeBacklog,
  toggleBacklogLoading,
} = backlog.actions;

export default backlog.reducer;
