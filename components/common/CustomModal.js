import { Modal } from "antd";
import React, { useState, useEffect, useMemo } from "react";

// example of data to be passed
const sampledata = [
  {
    attr: "title",
    type: "text",
    placeholder: "What's your idea title",
    required: true,
  },
  {
    attr: "description",
    type: "text",
    placeholder: "Type a small description",
  },
];

const CustomModal = ({ onSubmit, visible, onCancel, inputData, title }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    if (inputData) {
      const object = {};
      inputData.forEach((item) => (object[item.attr] = ""));
      setData(object);
    }
  }, [inputData]);
  const isOkButtonDisabled = useMemo(
    () =>
      inputData
        .filter((item) => item.required)
        .find((item) => data[item.attr]?.length === 0),
    [data, inputData]
  );

  const handleChange = (evt) => {
    const attr = evt.currentTarget.dataset.attr;
    setData((old) => ({ ...old, [attr]: evt.target.value }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isOkButtonDisabled) {
      onSubmit(data);
    }
  };
  return (
    <Modal
      visible={visible}
      title={title || "Fill the form"}
      className="modal"
      wrapClassName="custom-modal"
      onCancel={onCancel}
      onOk={handleSubmit}
      okButtonProps={{ disabled: isOkButtonDisabled }}
    >
      <form onSubmit={handleSubmit}>
        {inputData.map((item) => (
          <article key={inputData} className="modal-input-wrapper">
            <input
              data-attr={item.attr}
              className="modal-input"
              type={item.type || "text"}
              placeholder={data.placeholder || `Type ${item.attr} here ...`}
              value={data[item.attr]}
              onChange={handleChange}
              required={item.required || false}
            />
          </article>
        ))}
      </form>
    </Modal>
  );
};

export default CustomModal;
