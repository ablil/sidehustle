import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: {},
    loading: false,
  },
  reducers: {
    replaceAllNotes: (state, action) => {
      const { idea, notes } = action.payload;
      state.notes[idea] = notes;
    },
    addNote: (state, action) => {
      const { idea, note } = action.payload;
      if (Object.keys(state.notes).includes(idea)) {
        state.notes[idea].push(note);
      } else {
        state.notes[idea] = [note];
      }
    },
    updateNote: (state, action) => {
      const { idea, note } = action.payload;
      if (Object.keys(state.notes).includes(idea)) {
        state.notes[idea] = state.notes[idea].map((n) =>
          n.id === note.id ? note : n
        );
      }
    },
    removeNote: (state, action) => {
      const { idea, id } = action.payload;
      if (Object.keys(state.notes).includes(idea)) {
        state.notes[idea] = state.notes[idea].filter((n) => n.id !== id);
      }
    },
    toggleNoteLoading: (state, action) => {
      state.loading = action.payload || false;
    },
  },
});

export default noteSlice.reducer;
export const {
  replaceAllNotes,
  addNote,
  updateNote,
  removeNote,
  toggleNoteLoading,
} = noteSlice.actions;
