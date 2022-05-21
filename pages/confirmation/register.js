import React from "react";
import { NextSeo } from "next-seo";

const register = () => {
  return (
    <>
      <NextSeo noindex={true} title="Register" />
      <section>
        you account has been created, please check your email for confirmation
      </section>
    </>
  );
};

export default register;
