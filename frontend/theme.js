import { createMuiTheme } from "@material-ui/core/styles";
import {
  red,
  blue,
  indigo,
  cyan,
  teal,
  green,
  orange,
  grey
} from "@material-ui/core/colors";
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
      contrastText: "#fff"
    },
    secondary: {
      main: "#19857b"
    },
    error: {
      main: red.A400
    },
    white: {
      main: "white"
    },
    background: {
      default: "#fff"
    }
  },
  text: {
    white: "#fff"
  }
});

export default theme;
