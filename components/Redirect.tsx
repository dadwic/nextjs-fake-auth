import React from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AUTH_PATH } from "constants/index";
import { State } from "interfaces";

interface RedirectProps {
  children: React.ReactElement;
}

export default function Redirect({ children }: RedirectProps) {
  const router = useRouter();
  const timer = React.useRef<number>();
  const { enqueueSnackbar } = useSnackbar();
  const email = useSelector((state: State) => state.email);

  React.useEffect(() => {
    timer.current = window.setTimeout(() => {
      if (email) {
        router.push("/panel");
      } else {
        if (router.pathname !== AUTH_PATH) {
          router.push("/auth/login");
          enqueueSnackbar("Unauthorized.", { variant: "error" });
        }
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return children;
}
