import React from "react";
import CustomFooter from "../components/common/CustomFooter";

const contactus = () => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  return (
    <section id="contactus">
      <header>Contact us</header>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" required="true" />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          required="true"
          placeholder="content"
        ></textarea>
        <button type="submit">submit</button>
      </form>
      <CustomFooter />
    </section>
  );
};

export default contactus;
