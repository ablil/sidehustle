import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseconfig";
import Sidebar from "../Sidebar";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }

    console.log(user);
  }, [user, loading, router]);

  return user ? (
    <section id="mainlayout">
      <Sidebar />
      <div className="maincontent">{children}</div>
    </section>
  ) : (
    <article>loading ...</article>
  );
};

export default MainLayout;
