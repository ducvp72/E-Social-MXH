import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

const UseStyles = makeStyles({
  tabPanel: {
    width: '100%',
    "& > div": {
      padding: "4rem",
    },
  },
  tab:{
      color: red,
      '&:hover':{
          backgroundColor: red,
      }
  }
});

export default UseStyles;
