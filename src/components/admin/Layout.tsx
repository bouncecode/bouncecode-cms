import React from "react";
import Router from "next/router";

// Material Core
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ListSubheader from "@material-ui/core/ListSubheader";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

// Icons
import MenuIcon from "@material-ui/icons/Menu";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AppsIcon from "@material-ui/icons/Apps";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

const menu = [];

function Layout(props) {
  const { container, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.title}
            noWrap
          >
            <Link href="/" color="inherit">
              사이트 이름
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <List subheader={<ListSubheader>사이트 관리</ListSubheader>}>
        <ListItem button onClick={() => Router.push("/admin/settings")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"사이트 설정"} />
        </ListItem>
        <ListItem button onClick={() => Router.push("/admin/users")}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={"사용자 관리"} />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>콘텐츠 관리</ListSubheader>}>
        <ListItem button onClick={() => Router.push("/admin/menus")}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary={"메뉴 관리"} />
        </ListItem>
        <ListItem button onClick={() => Router.push("/admin/popups/write")}>
          <ListItemIcon>
            <WebAssetIcon />
          </ListItemIcon>
          <ListItemText primary={"팝업 관리"} />
        </ListItem>
        <ListItem button onClick={() => Router.push("/admin/pages/write")}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={"페이지 관리"} />
        </ListItem>
        <ListItem button onClick={() => Router.push("/admin/boards/write")}>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary={"게시판 관리"} />
        </ListItem>
        <ListItem button onClick={() => Router.push("/admin/faqs/write")}>
          <ListItemIcon>
            <LiveHelpIcon />
          </ListItemIcon>
          <ListItemText primary={"FAQ 관리"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            앱 관리자
          </Typography>
          <Button color="inherit">로그아웃</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Layout;
