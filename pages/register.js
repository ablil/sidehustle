import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import notifier from "../helpers/notifier";
import { auth } from "../services/firebaseconfig";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: "",
  });

  const router = useRouter();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  useEffect(() => {
    if (user) {
      router.push("/confirmation/register");
    }
  }, [router, user, error, loading]);

  const isDisabled = (data) => {
    return (
      loading &&
      (data.email.length === 0 ||
        data.emailConfirm.length === 0 ||
        data.password.length === 0 ||
        data.passwordConfirm.length === 0)
    );
  };

  const validate = (data) => {
    return (
      data.email?.length > 0 &&
      data.email === data.emailConfirm &&
      data?.password.length > 0 &&
      data.passwordConfirm === data.password
    );
  };

  const register = (evt) => {
    evt.preventDefault();
    const isDataValid = !isDisabled(data) && validate(data);
    if (isDataValid) {
      createUserWithEmailAndPassword(data.email, data.password)
        .then((_) => sendEmailVerification())
        .catch((err) =>
          notifier.error(err, "failed to create user, try later !")
        );
    } else {
      notifier.error(new Error("Invalid registration data"));
    }
  };

  return (
    <section id="login">
      <form onSubmit={register}>
        <header>Sign up for free, now.</header>
        <p>create an account and do not miss the opportunity</p>
        <input
          type="email"
          placeholder="type your email"
          value={data.email}
          onChange={(evt) =>
            setData((old) => ({ ...old, email: evt.target.value }))
          }
        />
        <input
          type="email"
          placeholder="type your email again !"
          value={data.emailConfirm}
          onChange={(evt) =>
            setData((old) => ({ ...old, emailConfirm: evt.target.value }))
          }
        />
        <input
          type="password"
          placeholder="type your password"
          minLength={10}
          value={data.password}
          onChange={(evt) =>
            setData((old) => ({ ...old, password: evt.target.value }))
          }
        />
        <input
          type="password"
          placeholder="type your password again !"
          value={data.passwordConfirm}
          onChange={(evt) =>
            setData((old) => ({ ...old, passwordConfirm: evt.target.value }))
          }
        />
        {!loading && (
          <button
            type="submit"
            style={{
              visibility: isDisabled(data) ? "hidden" : "visible",
            }}
            disabled={isDisabled(data)}
          >
            register
          </button>
        )}

        {error && <article className="err">{error.message}</article>}
      </form>

      <footer>
        <Link href="/login">already have an account ? </Link>
      </footer>
    </section>
  );
};

export default Login;
