import React, { useEffect, useState } from "react";
import Close from "./icons/Close";
import Pencil from "./icons/Pencil";

export const BacklogStatus = {
  open: { label: "Open", value: "OPEN" },
  inprogress: { label: "In Progress", value: "INPROGRESS" },
  done: { label: "Done", value: "DONE" },
};

const Backlog = ({ editable, backlog, toggleEdit, onRemove, onSave }) => {
  const [data, setData] = useState({
    title: "",
    content: "",
    status: BacklogStatus.open.value,
  });

  const handleChange = (evt) => {
    const attr = evt.currentTarget.dataset.attr;

    if (attr === "title")
      setData((old) => ({ ...old, title: evt.target.value }));

    if (attr === "content")
      setData((old) => ({ ...old, content: evt.target.value }));

    if (attr === "status") {
      setData((old) => ({ ...old, status: evt.target.value.toUpperCase() }));
      onSave({ ...backlog, status: evt.target.value });
    }
  };

  const handleEdit = () => {
    toggleEdit(backlog.id);
  };

  const handleRemove = () => {
    onRemove(backlog.id);
  };

  const handleSave = () => {
    onSave({ ...backlog, title: data.title, content: data.content });
  };

  const handleCancel = () => {
    toggleEdit(backlog.id);
  };

  useEffect(() => {
    setData({ title: backlog.title, content: backlog.content });
  }, [backlog.content, backlog.title]);

  return (
    <details className="backlog-item">
      <summary className="backlog-summary">
        <article className="backlog-title">
          <h1>{backlog.title}</h1>
        </article>

        <article title="last modified">
          {(backlog.lastModified?.toDate() || new Date()).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long", day: "numeric" }
          )}
        </article>
        <select
          data-attr="status"
          data-status={backlog.status}
          className="backlog-status"
          value={backlog.status}
          onChange={handleChange}
        >
          <option value="OPEN">Open</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
        <article
          className="backlog-options"
          style={{ visibility: editable ? "hidden" : "visible" }}
        >
          <button onClick={handleEdit}>
            <Pencil />
          </button>
          <button onClick={handleRemove}>
            <Close />
          </button>
        </article>
      </summary>
      {editable && (
        <article className="backlog-content-editable">
          <input
            type="text"
            value={data.title}
            placeholder="Quick description"
            onChange={handleChange}
            data-attr="title"
          />
          <textarea
            value={data.content}
            onChange={handleChange}
            data-attr="content"
            placeholder="Details ..."
          ></textarea>
          <article className="options">
            <button onClick={handleCancel}>cancel</button>
            <button onClick={handleSave}>save</button>
          </article>
        </article>
      )}
      {!editable && (
        <article className="backlog-content">
          <p>{backlog.content}</p>
        </article>
      )}
    </details>
  );
};

export default Backlog;
