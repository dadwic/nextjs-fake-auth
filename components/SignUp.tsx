import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "components/Link";
import Input from "components/Input";
import PasswordInput from "components/PasswordInput";
import { SignUpFormInput } from "interfaces";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();

export default function SignUp() {
  const methods = useForm<SignUpFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
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
