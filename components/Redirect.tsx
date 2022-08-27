import React from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useStickyState } from "hooks";
import { AUTH_PATH } from "constants/index";

interface RedirectProps {
  children: React.ReactElement;
}

export default function Redirect({ children }: RedirectProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [email] = useStickyState("email");
  const isAuthenticated = Boolean(email);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/panel");
    } else {
      if (router.pathname !== AUTH_PATH) {
        router.push("/auth/login");
        enqueueSnackbar("Unauthorized.", { variant: "error" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
