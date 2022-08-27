import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useStickyState } from "hooks";
import Box from "@mui/material/Box";
import NoSsr from "@mui/material/NoSsr";
import CircularProgress from "components/CircularProgress";

const Redirect = () => {
  const [email, setEmail] = useStickyState("", "email");
  const router = useRouter();

  useEffect(() => {
    router.push(Boolean(email) ? "panel" : "/auth/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const Index: NextPage = () => {
  return (
    <NoSsr>
      <Redirect />
    </NoSsr>
  );
};

export default Index;
