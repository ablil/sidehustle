import Link from "next/link";
import React from "react";

const CustomNavbar = () => {
  return (
    <nav id="landingpage-navbar">
      <h1>side hustle</h1>
      <section>
        <Link href="/login">login</Link>
        <Link href="/register">register</Link>
      </section>
    </nav>
  );
};

export default CustomNavbar;
