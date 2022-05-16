import { Dropdown } from "antd";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Bulb from "./icons/Bulb";
import LogoutIcon from "./icons/LogoutIcon";
import NoteIcon from "./icons/NoteIcon";
import User from "./icons/User";
import { auth } from "../services/firebaseconfig";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import metadata from "../metadata";

const routes = [
  {
    label: "Brilliant Ideas",
    path: "/ideas",
    icon: <Bulb />,
  },
  {
    label: "account info",
    path: "/profile",
    icon: <User />,
  },
  {
    label: "reminders",
    path: "/task",
    icon: <NoteIcon />,
  },
];
const Sidebar = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <nav id="sidebar">
      <header>
        <h1>{metadata.brand}</h1>
      </header>
      {routes.map((route) => (
        <article
          key={route.path}
          className={`link-wrapper ${
            router.pathname.startsWith(route.path)
              ? "link-wrapper-selected"
              : ""
          }`}
        >
          {route.icon}
          <Link href={route.path} data-path={route.path}>
            {route.label}
          </Link>
        </article>
      ))}

      <footer>
        <button id="logout" onClick={logout}>
          <LogoutIcon /> logout
        </button>
      </footer>
    </nav>
  );
};

export default Sidebar;
