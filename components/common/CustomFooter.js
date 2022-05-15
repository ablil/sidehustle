import React from "react";

const CustomFooter = () => {
  return (
    <footer id="landingpage-footer">
      <div className="wrapper">
        <section>
          <h1>resources</h1>
          <ul>
            <li>
              <a href="#">contact us</a>
            </li>
            <li>
              <a href="#">privacy policy</a>
            </li>
          </ul>
        </section>
        <section>
          <h1>for developers</h1>
          <ul>
            <li>
              <a href="#">github </a>
            </li>
            <li>
              <a href="#">issue or feature</a>
            </li>
          </ul>
        </section>
      </div>
      <footer>
        <article>&copy; All rights reserved {new Date().getFullYear()}</article>
        <article>ideastab</article>
      </footer>
    </footer>
  );
};

export default CustomFooter;
