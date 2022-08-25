import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#d3a45d",
    },
    secondary: {
      main: "#3D74B8",
    },
    error: {
      main: red.A400,
    },
  },
});

// SWR fetcher
export const fetcher = (url: string) => fetch(url).then((res) => res.json());
