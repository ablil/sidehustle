import { configureStore } from "@reduxjs/toolkit";
import ideasReducers from "./slices/idea";
import noteReducers from "./slices/note";
import featureReducers from "./slices/feature";
import backlogReducers from "./slices/backlog";
import todoReducers from "./slices/todo";

export default configureStore({
  reducer: {
    ideas: ideasReducers,
    notes: noteReducers,
    features: featureReducers,
    backlogs: backlogReducers,
    todos: todoReducers,
  },
});
