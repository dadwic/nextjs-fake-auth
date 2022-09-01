import React from "react";
import type { State } from "interfaces";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "components/LoadingOverlay";
import { AUTH_PATH } from "constants/index";
import { setLoading } from "hooks/store";

interface RedirectProps {
  children: React.ReactElement;
}

export default function Redirect({ children }: RedirectProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const timer = React.useRef<number>();
  const { email, loading } = useSelector((state: State) => state);

  React.useEffect(() => {
    const handleStart = (_url: string) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
      // Hide loading overlay
      dispatch(setLoading(false));
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  React.useEffect(() => {
    timer.current = window.setTimeout(() => {
      if (email) {
        // Redirect to panel after 1 second
        router.push("/panel");
      } else {
        if (router.pathname !== AUTH_PATH) {
          router.push("/auth/login");
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
