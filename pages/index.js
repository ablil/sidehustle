import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CustomFooter from "../components/common/CustomFooter";
import CustomNavbar from "../components/common/CustomNavbar";
import Computer from "../components/icons/landingpage/Computer";
// import styles from "../styles/Home.module.css";
import showcase from "../public/images/showcase.png";

export default function Home() {
  return (
    <>
      <main>
        <section id="main-banner">
          <CustomNavbar />
          <header>The perfect place for developers</header>
          <article>
            you can save your side projects ideas that comes to you mind, an
            keep track of your progress, features, tech stack ...
          </article>
          <Computer />
          <footer>
            <Link href="/register">register now</Link>
          </footer>
        </section>

        <section className="showcase">
          <p>Save all your ideas in one place with quick and easy access</p>
          <img src="/images/showcase/dashboard.png" alt="dashboard" />
        </section>
        <section className="showcase">
          <p>
            Create a backlog of task you want to do and what status each task is
            in
          </p>
          <img src="/images/showcase/backlog.png" alt="backlog" />
        </section>
        <section className="showcase">
          <p>
            Have access to reminders section that act as a quick todo list for
            thing unrelated to any projec
          </p>
          <img src="/images/showcase/reminders.png" alt="reminders" />
        </section>
        <section className="showcase">
          <p>save technical metadata</p>
          <img src="/images/showcase/metadata.png" alt="metadata" />
        </section>

        <section id="features">
          <header>from a developer and for developers</header>
          <section>
            <article className="feature">
              <h1>intuitive user experience</h1>
              <p>
                quickly add new ideas to your ideas tab and a quick explanation
                so you do NOT forget what it is about.
              </p>
            </article>
            <article className="feature">
              <h1>note what comes to your mind</h1>
              <p>
                Any thought that come to your mind, and you are not sure where
                it belongs, it has a place on ideas tab.
              </p>
            </article>
            <article className="feature">
              <h1>specify if needed</h1>
              <p>
                Specify any technology you want to use for your idea
                implementation, or any related link that you may find useful.
              </p>
            </article>
          </section>
        </section>
      </main>
      <CustomFooter />
    </>
  );
}
