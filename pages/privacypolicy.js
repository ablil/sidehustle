import React from "react";
import CustomFooter from "../components/common/CustomFooter";

const privacypolicy = () => {
  return (
    <section id="privacypolicy">
      <div className="wrapper">
        <header>privacy policy</header>

        <article>
          <ul>
            <li>
              We do not collect your personal information because we do not any
              (except your email !)
            </li>
            <li>We do not use cookies (we might in the future)</li>
          </ul>
        </article>

        <article>
          We do however reserve the right to track usage with web analytics
          software such as Google Analytics using a cookies-free implementation.
        </article>
      </div>
      <CustomFooter />
    </section>
  );
};

export default privacypolicy;
