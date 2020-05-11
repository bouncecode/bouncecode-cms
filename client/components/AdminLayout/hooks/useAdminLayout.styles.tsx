// Material Core
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useAdminLayoutStyles = makeStyles((theme) => ({
  loading: {
    zIndex: 9999,
  },
  root: {
    display: "flex",
  },
  title: {
    flexGrow: 1,
    "& a, & a:hover, & a:active, & a:focus": {
      color: "inherit",
      textTransform: "none",
    },
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
