import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "ideas",
  initialState: {
    ideas: [],
    loading: false,
    current: undefined,
  },
  reducers: {
    reset: (state) => {
      state.errors = [];
      state.ideas = [];
    },
    replaceAllIdeas: (state, action) => {
      state.ideas = [].concat(action.payload);
    },
    addIdea: (state, action) => {
      state.ideas = state.ideas.concat(action.payload);
    },
    updateIdea: (state, action) => {
      const { id, data } = action.payload;
      state.ideas = state.ideas.map((idea) => (idea.id === id ? data : idea));
    },
    removeIdea: (state, action) => {
      const { id } = action.payload;
      const index = state.ideas.findIndex((idea) => idea.id === id);
      if (index >= 0) {
        state.ideas.splice(index, 1);
      }
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload || false;
    },
    setSelectedIdea: (state, action) => {
      state.current = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  replaceAllIdeas,
  reset,
  toggleLoading,
  setSelectedIdea,
  addIdea,
  removeIdea,
  updateIdea,
} = slice.actions;
