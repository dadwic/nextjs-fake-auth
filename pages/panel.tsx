import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import NoSsr from "@mui/material/NoSsr";
import Dashboard from "components/Dashboard";

const Panel: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <NoSsr>
        <Dashboard />
      </NoSsr>
    </>
  );
};

export default Panel;
