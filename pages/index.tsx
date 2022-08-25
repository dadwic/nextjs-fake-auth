import * as React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import SignInSide from "components/SignInSide";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignInSide />;
    </>
  );
};

export default Home;
