import React from "react";
import * as yup from "yup";
import Head from "next/head";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PasswordInput from "components/PasswordInput";
import Input from "components/Input";
import Link from "components/Link";
import { LoginFormInput } from "interfaces";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

export default function SignIn() {
  const router = useRouter();
  const methods = useForm<LoginFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <Head>
        <title>Sign In</title>
      </Head>
      <Box
        component="form"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ mt: 1 }}
      >
        <Input
          required
          fullWidth
          margin="normal"
          id="email"
          type="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />
        <PasswordInput />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
}