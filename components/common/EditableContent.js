import React from "react";
import { useRef } from "react";
import { useState } from "react";

const EditableContent = ({
  editable,
  attr,
  value,
  onBlur,
  toggleEdit,
  placeholder,
  longText,
  style,
}) => {
  const [content, setContent] = useState(value);

  const ref = useRef(null);

  const handleChange = (evt) => {
    setContent(evt.target.value);
  };

  const handleToggleEdit = (evt) => {
    if (toggleEdit) toggleEdit(attr);
  };

  return (
    <section className="editable" style={style}>
      {editable && !longText && (
        <input
          ref={ref}
          type="text"
          data-attr={attr}
          value={content}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder || "Type here ..."}
        />
      )}
      {editable && longText && (
        <textarea
          ref={ref}
          type="text"
          data-attr={attr}
          value={content}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder || "Type here ..."}
        ></textarea>
      )}
      {!editable && <article onClick={handleToggleEdit}>{content}</article>}
    </section>
  );
};

export default EditableContent;
