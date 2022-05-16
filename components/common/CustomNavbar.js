import Link from "next/link";
import React from "react";
import metadata from "../../metadata";

const CustomNavbar = () => {
  return (
    <nav id="landingpage-navbar">
      <h1>{metadata.brand}</h1>
      <section>
        <Link href="/login">login</Link>
        <Link href="/register">register</Link>
      </section>
    </nav>
  );
};

export default CustomNavbar;
