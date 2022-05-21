import React, { useState, useEffect, useRef } from "react";
import Close from "./icons/Close";

const Todo = ({ todo, editable, toggleEdit, onSave, onRemove }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const handleChange = (evt) => {
    setContent(evt.target.value);
  };

  const handleEdit = () => {
    toggleEdit(todo.id);
  };

  const handleBlur = () => {
    onSave({ ...todo, content });
    toggleEdit(todo.id);
  };

  const onEnter = (evt) => {
    if (evt.key === "Enter") {
      handleBlur();
    }
  };

  const toggleStatus = (evt) => {
    onSave({ ...todo, completed: !todo.completed });
  };

  const handleRemove = () => {
    onRemove(todo);
  };
  useEffect(() => {
    setContent(todo.content);
    if (editable) contentRef.current.focus();

    return () => {};
  }, [editable, todo.content]);

  return (
    <div className="todo-wrapper">
      <article
        className={`todo ${editable ? "selected" : ""} ${
          todo.completed ? "disabled" : ""
        }`}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleStatus}
        />
        {editable && (
          <input
            ref={contentRef}
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={onEnter}
            value={content}
            placeholder="Type here"
          />
        )}
        {!editable && (
          <p
            onClick={handleEdit}
            title="click to edit"
            className="content-wrapper"
          >
            <p>{todo.content}</p>
            <p>
              <small>
                {todo.created?.toDate().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </small>
            </p>
          </p>
        )}
      </article>
      {todo.id !== "new" && (
        <button onClick={handleRemove} className="remove-todo">
          <Close />
        </button>
      )}
    </div>
  );
};

export default Todo;
