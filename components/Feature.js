import React, { useEffect, useRef, useState } from "react";

const Feature = ({ feature, editable, handleSubmit, onRemove, toggleEdit }) => {
  const [content, setContent] = useState("");
  const inp = useRef(null);

  const handleChange = (evt) => {
    setContent(evt.target.value);
  };

  const onBlur = () => {
    if (handleSubmit) {
      handleSubmit({ ...feature, content });
    }
  };

  useEffect(() => {
    setContent(feature.content || "");

    if (editable) {
      inp.current.focus();
    }
  }, [editable, feature.content]);

  return (
    <article className={`feature ${editable ? "feature-editable" : ""}`}>
      <span className="feature-prefix">as a user I want to</span>
      {editable && (
        <input
          ref={inp}
          className="feature-content"
          type="text"
          value={content}
          data-id={feature.id}
          onChange={handleChange}
          placeholder="Type here ..."
          onBlur={onBlur}
        />
      )}
      {!editable && (
        <article
          data-id={feature.id}
          onClick={toggleEdit}
          title="click to edit"
          className="feature-content"
        >
          {feature.content}
        </article>
      )}
      <button
        data-id={feature.id}
        className="feature-remove"
        title="cancel modification"
        style={{ visibility: "visible" }}
        onClick={onRemove}
      >
        &times;
      </button>
    </article>
  );
};

export default Feature;
