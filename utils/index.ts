import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        sx: { color: "common.black", textDecoration: "none" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          width: "100%",
          textAlign: "center",
        },
        shrink: {
          textAlign: "left",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#333131",
    },
    secondary: {
      main: "#3D74B8",
    },
    error: {
      main: red.A400,
    },
  },
});

export const isServer = typeof window === "undefined";

// SWR fetcher
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
