import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import metadata from "../../metadata";
import { auth } from "../../services/firebaseconfig";

const CustomNavbar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <nav id="landingpage-navbar">
      <h1>{metadata.brand}</h1>
      <section>
        {!user && !loading && (
          <>
            <Link href="/login">login</Link>
            <Link href="/register">register</Link>
          </>
        )}
        {user && !loading && <Link href="/ideas">App</Link>}
      </section>
    </nav>
  );
};

export default CustomNavbar;
