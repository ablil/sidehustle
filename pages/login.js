import Link from "next/link";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import notifier from "../helpers/notifier";
import metadata from "../metadata";
import { auth } from "../services/firebaseconfig";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const loginError = useMemo(
    () =>
      error?.message.includes("wrong-password")
        ? "incorrect credentials"
        : "failed to log you in, try later !",
    [error]
  );

  useEffect(() => {
    if (user) {
      router.push("/ideas");
      window.localStorage.setItem("uid", user.user.uid);
    }

    if (error) {
      notifier.error(error);
    }
  }, [user, loading, error, router]);

  const isValid = (data) => {
    return (
      data.email &&
      data.email?.length > 0 &&
      data.password &&
      data.password?.length > 0
    );
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid(data)) {
      signInWithEmailAndPassword(data.email, data.password);
    } else {
      notifier.error(new Error("login data is invalid"));
    }
  };

  return (
    <>
      <NextSeo title="Login" />
      <section id="login">
        <form onSubmit={handleSubmit}>
          <header>welcome back !</header>
          <p>please enter your details to login</p>
          <input
            type="email"
            placeholder="type your email"
            value={data.email}
            autoFocus={true}
            onChange={(evt) =>
              setData((old) => ({ ...old, email: evt.target.value }))
            }
            disabled={loading}
          />
          <input
            type="password"
            placeholder="type your password"
            value={data.password}
            onChange={(evt) =>
              setData((old) => ({ ...old, password: evt.target.value }))
            }
            disabled={loading}
          />

          <article className="footer">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
            <Link href="/forgetpassword">Forget password ?</Link>
          </article>

          {!loading && (
            <button
              type="submit"
              disabled={data.email.length === 0 && data.password.length === 0}
            >
              login
            </button>
          )}
          {error && <article className="err">{loginError}</article>}
        </form>
        <footer>
          <span>Do not have an account ?</span>
          <strong>
            <Link href="/register">Signup for free</Link>
          </strong>
        </footer>
      </section>
    </>
  );
};

export default Login;
