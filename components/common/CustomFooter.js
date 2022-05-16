import Link from "next/link";
import React from "react";
import metadata from "../../metadata";

const CustomFooter = () => {
  return (
    <footer id="landingpage-footer">
      <div className="wrapper">
        <section>
          <h1>resources</h1>
          <ul>
            <li>
              {/* TODO: contact page */}
              <a href="#">contact us</a>
            </li>
            <li>
              <Link href="/privacypolicy">privacy policy</Link>
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
        <article>
          <Link href="/">{metadata.brand}</Link>
        </article>
      </footer>
    </footer>
  );
};

export default CustomFooter;
