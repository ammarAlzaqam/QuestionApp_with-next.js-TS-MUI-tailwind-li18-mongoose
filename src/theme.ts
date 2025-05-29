import { createTheme } from "@mui/material/styles";

type Direction = "ltr" | "rtl"

const getAppTheme = (direction: Direction = "ltr") => createTheme({
  direction,
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});


export default getAppTheme;