import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import Plus from "../components/icons/Plus";
import MainLayout from "../components/layouts/MainLayout";
import Todo from "../components/Todo";
import notifier from "../helpers/notifier";
import {
  addTodo,
  removeTodo,
  replaceAllTodos,
  toggleTodoLoading,
  updateTodo,
} from "../redux/slices/todo";
import service from "../services/firebaseservice";

const Task = () => {
  const todos = useSelector((state) => state.todos.todos);
  const loadingTodos = useSelector((state) => state.todos.loading);
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [editable, setEditable] = useState(undefined);
  const [newTodo, setNewTodo] = useState(false);

  const openTodos = useMemo(() => {
    const filtered = todos?.filter((todo) => !todo.completed) || [];
    if (keyword)
      return filtered.filter((todo) => todo.content.includes(keyword));
    else return filtered;
  }, [todos, keyword]);

  const completedTodos = useMemo(() => {
    const filtered = todos?.filter((todo) => todo.completed) || [];
    if (keyword)
      return filtered.filter((todo) => todo.content.includes(keyword));
    else return filtered;
  }, [todos, keyword]);

  const handleKeywordChange = (evt) => {
    setKeyword(evt.target.value);
  };

  const toggleEdit = (id) => {
    if (editable === id) setEditable(undefined);
    else setEditable(id);
  };

  const saveTodo = (todo) => {
    if (todo.id === "new") {
      toggleAddTask();
      const clone = { ...todo, id: v4() };
      if (clone.content) {
        dispatch(addTodo(clone));
        service.todo
          .add(clone)
          .catch((err) => notifier.error(err, "failed to add todo"))
          .catch(() => dispatch(handleRemoveTodo(clone.id)));
      }
    } else {
      dispatch(updateTodo(todo));
      service.todo
        .update(todo)
        .catch((err) => notifier.error(err, "failed to update todo"));
    }
    console.log("save todo: ", todo);
  };

  const toggleAddTask = () => {
    setNewTodo((old) => !old);
  };

  const handleRemoveTodo = (todo) => {
    dispatch(removeTodo(todo.id));
    service.todo
      .remove(todo.id)
      .catch((err) => notifier.error(err, "failed to remove todo"))
      .catch(() => dispatch(addTodo(todo)));
  };

  useEffect(() => {
    dispatch(toggleTodoLoading(true));
    service.todo
      .loadAll()
      .then((res) => dispatch(replaceAllTodos(res)))
      .catch((err) => notifier.error(err, "failed to load data"))
      .finally(() => dispatch(toggleTodoLoading(false)));
  }, []);

  if (loadingTodos) return "Loading ...";
  return (
    <MainLayout>
      <section className="todos-container">
        <header>
          <input
          className="searchbar"
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="Search here"
          />
        </header>

        <button onClick={toggleAddTask} id="add-todo">
          <Plus /> <span>add task</span>
        </button>

        <section className="todos-content">
          <header className="todos-title">
            Open - {openTodos.length || 0}
          </header>
          <article className="todos-section">
            {newTodo && (
              <Todo
                editable={newTodo}
                todo={{ id: "new", content: "", completed: false }}
                toggleEdit={toggleEdit}
                onSave={saveTodo}
              />
            )}
            {openTodos.map((todo) => (
              <Todo
                editable={editable === todo.id}
                todo={todo}
                toggleEdit={toggleEdit}
                onSave={saveTodo}
                onRemove={handleRemoveTodo}
                key={todo.id}
              />
            ))}
          </article>
        </section>
        <header className="todos-title">
          Completed - {completedTodos.length || 0}
        </header>
        <article className="todos-section">
          {completedTodos.map((todo) => (
            <Todo
              editable={false}
              todo={todo}
              toggleEdit={(id) => {}}
              onSave={saveTodo}
              onRemove={handleRemoveTodo}
              key={todo.id}
            />
          ))}
        </article>
      </section>
    </MainLayout>
  );
};

export default Task;
