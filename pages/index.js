import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CustomFooter from "../components/common/CustomFooter";
import CustomNavbar from "../components/common/CustomNavbar";
// import styles from "../styles/Home.module.css";
import showcase from "../public/images/showcase.png";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <main>
        <section id="main-banner">
          <header>The perfect place for developers</header>
          <article>
            you can save your side projects ideas that comes to you mind, an
            keep track of your progress, features, tech stack ...
          </article>
          <footer>
            <Link href="/register">register now</Link>
          </footer>
        </section>

        <section id="showcase">
          <img src="/images/showcase.png" alt="showcase" />
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
