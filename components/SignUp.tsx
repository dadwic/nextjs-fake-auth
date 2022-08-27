import React from "react";
import * as yup from "yup";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "components/Link";
import Input from "components/Input";
import PasswordInput from "components/PasswordInput";
import { SignUpFormInput } from "interfaces";
import { useStickyState } from "hooks";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();

export default function SignUp() {
  const router = useRouter();
  const timer = React.useRef<number>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [, setEmail] = useStickyState("email");
  const methods = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const onSubmit = (data: any) => {
    setLoading(true);
    setEmail(data.email as string);
    enqueueSnackbar("You have successfully signed up.", { variant: "success" });
    // Redirect to panel after 3 seconds
    timer.current = window.setTimeout(() => {
      setLoading(false);
      router.push("/panel");
    }, 3000);
  };

  return (
    <FormProvider {...methods}>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <Input
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First name"
          name="firstName"
          autoComplete="fname"
        />
        <Input
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last name"
          name="lastName"
          autoComplete="lname"
        />
        <Input
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <PasswordInput />
        <Box sx={{ position: "relative", my: 3 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            Sign Up
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
        <Grid container>
          <Grid item xs>
            <Link href="/auth/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}
