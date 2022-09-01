import React from "react";
import type { State } from "interfaces";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_PATH } from "constants/index";
import { setLoading } from "hooks/store";
import LoadingOverlay from "components/LoadingOverlay";

interface RedirectProps {
  children: React.ReactElement;
}

export default function Redirect({ children }: RedirectProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const timer = React.useRef<number>();
  const { enqueueSnackbar } = useSnackbar();
  const { email, loading } = useSelector((state: State) => state);

  React.useEffect(() => {
    timer.current = window.setTimeout(() => {
      if (email) {
        // Set loading false
        dispatch(setLoading(false));
        // Redirect to panel after 1 second
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

  return loading ? <LoadingOverlay /> : children;
}
