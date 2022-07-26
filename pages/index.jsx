import Head from "next/head";
import BaseHeader from "../components/BaseHeader";
import HomePage from "./Home";

export default function Home() {
  return (
    <div>
      <Head>
        <title>NUS MBA Programme Builder</title>
        <meta name="description" content="NUS MBA Programme Builder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BaseHeader />

      <main>
        <HomePage />
      </main>

    </div>
  );
}
