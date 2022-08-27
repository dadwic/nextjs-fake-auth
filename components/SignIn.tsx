import React from "react";
import * as yup from "yup";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PasswordInput from "components/PasswordInput";
import Input from "components/Input";
import Link from "components/Link";
import { LoginFormInput } from "interfaces";
import { useStickyState } from "hooks";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  })
  .required();

export default function SignIn() {
  const router = useRouter();
  const timer = React.useRef<number>();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = React.useState(false);
  const [, setEmail] = useStickyState("email");
  const methods = useForm<LoginFormInput>({
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
    enqueueSnackbar("You have successfully logged in.", { variant: "success" });
    // Redirect to panel after 3 seconds
    timer.current = window.setTimeout(() => {
      setLoading(false);
      router.push("/panel");
    }, 3000);
  };

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
        <Box sx={{ position: "relative", my: 3 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
          >
            Sign In
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
