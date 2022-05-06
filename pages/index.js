import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CustomFooter from "../components/common/CustomFooter";
import CustomNavbar from "../components/common/CustomNavbar";
// import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <main>
        <section>
          <header>ideastab</header>
          <article>
            Ideastab is the perfect place for developers, you can save your side
            projects ideas that comes to you mind, an keep track of your
            progress, features, tech stack ...
          </article>
          <footer>
            <button>
              <Link href="/register">register now</Link>
            </button>
          </footer>
        </section>

        <section>
          <header>
            an experience you would expect from a professional tool
          </header>
          <article>from a developer, and for developers</article>
          <section>
            <article>
              <h1>intuitive user experience</h1>
              <p>
                quickly add new ideas to your ideas tab and a quick explanation
                so you do NOT forget what it is about.
              </p>
            </article>
            <article>
              <h1>note what comes to your mind</h1>
              <p>
                Any thought that come to your mind, and you are not sure where
                it belongs, it has a place on ideas tab.
              </p>
            </article>
            <article>
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
