import { signInAnonymously } from "firebase/auth";
import React, { useState } from "react";
import { v4 } from "uuid";
import CustomFooter from "../components/common/CustomFooter";
import notifier from "../helpers/notifier";
import gtm from "../lib/gtm";
import { auth } from "../services/firebaseconfig";
import service from "../services/firebaseservice";
import { NextSeo } from "next-seo";

const Contactus = () => {
  const [data, setData] = useState({ email: "", content: "" });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    signInAnonymously(auth).then(() => service.contact.save(v4(), data));
    notifier.success("submitted", "We will get back to you soon");
    setData({ email: "", content: "" });

    gtm.contact();
  };
  return (
    <>
      <NextSeo title="Contact Us" />
      <section id="contactus">
        <header>Contact us</header>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            required={true}
            value={data.email}
            onChange={(evt) =>
              setData((old) => ({ ...old, email: evt.target.value }))
            }
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            required={true}
            placeholder="content"
            value={data.content}
            onChange={(evt) =>
              setData((old) => ({ ...old, content: evt.target.value }))
            }
          ></textarea>
          <button disabled={true} type="submit">
            submit
          </button>
        </form>
        <CustomFooter />
      </section>
    </>
  );
};

export default Contactus;
