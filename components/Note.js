import React, { useEffect, useRef, useState } from "react";
import Close from "./icons/Close";
import PencilIcon from "./icons/Pencil";

const Note = ({ editable, note, toggleEdit, onRemove, onSave }) => {
  const [content, setContent] = useState("");
  const inp = useRef();

  const handleContentChange = (evt) => {
    setContent(evt.target.value);
  };

  const handleEdit = () => {
    toggleEdit(note.id);
  };

  const handleCancel = () => {
    toggleEdit(note.id);
  };

  const handleRemove = () => {
    onRemove(note);
  };

  const handleSave = () => {
    onSave({ ...note, content });
  };

  useEffect(() => {
    if (note?.content) setContent(note.content);
    if (editable) inp.current.focus();
  }, []);

  return (
    <section
      className={`note ${editable ? "note-editable" : ""}`}
      data-id={note.id}
    >
      {editable && (
        <>
          <textarea
            ref={inp}
            className="note-content"
            value={content}
            placeholder="Type here"
            onChange={handleContentChange}
          ></textarea>
          <article className="note-options">
            <button onClick={handleCancel}>cancel</button>
            <button onClick={handleSave}>save</button>
          </article>
        </>
      )}
      {!editable && (
        <>
          <article className="note-content">{note.content}</article>
          <article className="note-options">
            <button onClick={handleEdit}>
              <PencilIcon title="Edit" />
            </button>
            <button onClick={handleRemove}>
              <Close title="Delete" onClick={handleRemove} />
            </button>
          </article>
        </>
      )}
    </section>
  );
};

export default Note;
