import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import notifier from "../helpers/notifier";
import { auth } from "../services/firebaseconfig";

const Forgetpassword = () => {
  const router = useRouter();
  const [sent, stSent] = useState(false);
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  useEffect(() => {
    if (!sending && !error && sent) {
      router.push("/confirmation/forgetpassword");
    }
  }, [sending, error, sent, router]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (email && email.length > 0) {
      sendPasswordResetEmail(email)
        .then((res) => setSent(true))
        .catch((err) =>
          notifier.error(err, "failed to send email, try again !")
        );
    }
  };
  return (
    <section id="login">
      <form onSubmit={handleSubmit}>
        <header>reset your password</header>
        <input
          type="email"
          placeholder="Type your email here"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required="true"
        />
        {!sending && (
          <button type="submit" disabled={email.length === 0}>
            send reset link
          </button>
        )}
        {error && (
          <article className="err">
            Failed to send reset link, try later
          </article>
        )}
      </form>
      <footer>
        <Link href="/login">already have an account</Link>
        <Link href="/register">create a new account</Link>
      </footer>
    </section>
  );
};

export default Forgetpassword;
