import React from "react";

// Material Core
import { useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// Icons
import MenuIcon from "@material-ui/icons/Menu";

// Styles
import { useAdminLayoutStyles } from "./hooks/useAdminLayout.styles";
import { AdminLayoutDrawer } from "./AdminLayoutDrawer";
import { useSignOutCallback } from "client/commons/useSignOut.callback";

export function AdminLayout(props) {
  const { container, children } = props;
  const theme = useTheme();
  const classes = useAdminLayoutStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleLogout = useSignOutCallback();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          <Button color="inherit" onClick={handleLogout}>
            로그아웃
          </Button>
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
            <AdminLayoutDrawer />
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
            <AdminLayoutDrawer />
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
