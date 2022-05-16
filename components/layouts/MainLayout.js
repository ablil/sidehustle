import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseconfig";
import Loading from "../icons/Loading";
import Sidebar from "../Sidebar";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      window.localStorage.removeItem("uid");
    }
  }, [user]);

  return user ? (
    <section id="mainlayout">
      <Sidebar />
      <div className="maincontent">{children}</div>
    </section>
  ) : (
    <Loading />
  );
};

export default MainLayout;
