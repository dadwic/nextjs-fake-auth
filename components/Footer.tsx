import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {`Copyright © ${new Date().getFullYear()}`}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
      }}
    >
      <Typography variant="body1">
        Made with ❤️ by{" "}
        <Link
          color="inherit"
          target="_blank"
          href="https://github.com/dadwic"
          rel="noopener noreferrer"
        >
          @dadwic
        </Link>
      </Typography>
      <Copyright />
    </Box>
  );
}
