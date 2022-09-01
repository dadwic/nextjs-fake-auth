import React from "react";
import * as yup from "yup";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LoadingOverlay from "components/LoadingOverlay";
import PasswordInput from "components/PasswordInput";
import Input from "components/Input";
import Link from "components/Link";
import { LoginFormInput } from "interfaces";
import { useStickyState } from "hooks";

const schema = yup
  .object({
    email: yup
      .string()
      .required()
      .email("Lütfen gegerli bir e-mail adresi girin."),
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
    setEmail(data.email);
    enqueueSnackbar("You have successfully logged in.", { variant: "success" });
    // Redirect to panel after 3 seconds
    timer.current = window.setTimeout(() => {
      setLoading(false);
      router.push("/panel");
    }, 3000);
  };

  if (loading) return <LoadingOverlay />;

  return (
    <FormProvider {...methods}>
      <Head>
        <title>Giriş Yap</title>
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
          label="E-mail Adresin"
          name="email"
          autoComplete="email"
        />
        <PasswordInput />
        <Box sx={{ position: "relative", my: 3 }}>
          <Button fullWidth type="submit" variant="contained">
            Giriş Yap
          </Button>
        </Box>
        <Link href="/auth/signup" variant="body2" display="block" align="right">
          Şifremi Unuttum
        </Link>
      </Box>
    </FormProvider>
  );
}
