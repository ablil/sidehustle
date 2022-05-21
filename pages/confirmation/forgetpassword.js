import React from "react";
import { NextSeo } from "next-seo";

const forgetpassword = () => {
  return (
    <>
      <NextSeo noindex={true} title="Forget Password" />
      <section>
        If you have an account with this email, you will recieve a reset link
        shortly !
      </section>
    </>
  );
};

export default forgetpassword;
