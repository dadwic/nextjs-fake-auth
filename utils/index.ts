import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
export const theme = createTheme({
  components: {
    MuiLink: {
      styleOverrides: {
        root: { color: "common.black", textDecoration: "none" },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        fullWidth: {
          margin: "24px 0",
          borderRadius: 24,
          height: 48,
        },
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
