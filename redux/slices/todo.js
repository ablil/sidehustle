import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
};

const todo = createSlice({
  name: "todos",
  initialState,
  reducers: {
    replaceAllTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const id = action.payload.id;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? action.payload : todo
      );
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoLoading: (state, action) => {
      state.loading = action.payload || false;
    },
  },
});

export const {
  addTodo,
  replaceAllTodos,
  updateTodo,
  removeTodo,
  toggleTodoLoading,
} = todo.actions;

export default todo.reducer;
