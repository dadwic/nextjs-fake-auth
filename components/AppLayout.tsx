import React from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LOGIN_PATH, SIGNUP_PATH } from "constants/index";
import TabPanel from "components/TabPanel";
import Footer from "components/Footer";
import SignIn from "components/SignIn";
import SignUp from "components/SignUp";
import { a11yProps } from "utils";
import { Typography } from "@mui/material";

export default function AppLayout() {
  const router = useRouter();
  const { slug } = router.query;
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (slug) {
      setValue(Number(slug === SIGNUP_PATH));
    }
  }, [slug]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    // Change the page slug
    router.push(`/auth/${newValue ? SIGNUP_PATH : LOGIN_PATH}`);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background:
            "url(/images/background-auth.svg) center center/cover no-repeat",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container maxWidth="xs">
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight={500} gutterBottom>
              Merhaba
            </Typography>
            <Typography
              variant="body1"
              fontWeight={400}
              color="text.secondary"
              align="center"
              gutterBottom
            >
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Giriş Yap" {...a11yProps(0)} />
                <Tab label="Üye Ol" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <SignIn />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SignUp />
            </TabPanel>
            <Footer />
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
