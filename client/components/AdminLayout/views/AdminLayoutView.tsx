/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.AdminLayout.views
 */

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
import { useAdminLayoutViewStyles } from "../styles/AdminLayoutView.styles";
import { IMeQueryObject } from "client/commons/useMe.query";

export interface IAdminLayoutView {
  /**
   * 좌측에 표시되는 Drawer 엘리먼트입니다.
   */
  drawer: JSX.Element;

  /**
   * 유저 정보가 담겨있는 IMeQueryObject 여야합니다.
   */
  data: IMeQueryObject;

  /**
   * 로그아웃 버튼을 클릭했을 때 실행하는 함수입니다.
   */
  handleLogout: () => void;

  /**
   * 메인 콘텐츠 영역입니다.
   */
  children?: any;
}

/**
 * 관리자 레이아웃입니다.
 */
export function AdminLayoutView(props: IAdminLayoutView) {
  const theme = useTheme();
  const classes = useAdminLayoutViewStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
          <Hidden smDown>
            <Button color="inherit" disabled>
              {props.data.me?.email}
            </Button>
          </Hidden>
          <Button color="inherit" onClick={props.handleLogout}>
            로그아웃
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            // container={container}
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
            {props.drawer}
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
            {props.drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
