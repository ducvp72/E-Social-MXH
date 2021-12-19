import { makeStyles } from "@mui/styles";

export const mystyles = makeStyles((theme) => ({
  root: {},
  cusDiv: {
    "& .MuiOutlinedInput-root": {
      with: "100%",
      marginTop: "0.5rem",
      padding: "1px",
      position: "relative",
    },
    "& > div": {
      with: "100% !important",
      marginTop: "0.5rem",
      padding: "1px",
      position: "relative",
    },
  },
}));
