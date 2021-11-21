import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {},
  searchForm: {
    "& > div": {
      borderRadius: "10px",
    },
  },

  // Table
  dataGridContainer: {
    height: 380,
    width: "100%",
    backgroundColor: "#fff",

    marginTop: "10px",
  },

  avatar: {
    "&.MuiAvatar-root": {
      textTransform: "uppercase",
      width: 32,
      height: 32,
    },
  },
  activeBox: {
    "& > button": {
      textTransform: "unset",
      fontSize: "12px",
      borderRadius: "150px",
      borderWidth: "2px",
    },
  },

  actionBox: {},
  deleteButton: {},
  editButton: {},
}));
