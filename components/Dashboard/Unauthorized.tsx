import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="up" />;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Unauthorized() {
  return (
    <Snackbar open TransitionComponent={TransitionLeft}>
      <Alert severity="error" sx={{ width: "100%" }}>
        Unauthorized.
      </Alert>
    </Snackbar>
  );
}
