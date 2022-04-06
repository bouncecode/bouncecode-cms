/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

// Material Core
import {useTheme} from '@mui/material/styles';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Icons
import MenuIcon from '@mui/icons-material/Menu';

// Styles
import {useAdminLayoutViewStyles} from './styles';
import {MeQuery} from 'client/generated/graphql';

export interface IAdminLayoutModule {
  /**
   * 좌측에 표시되는 Drawer 엘리먼트입니다.
   */
  drawer?: JSX.Element;

  /**
   * 유저 정보가 담겨있는 IMeQueryObject 여야합니다.
   */
  data: MeQuery;

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
export function AdminLayoutModule(props: IAdminLayoutModule) {
  const theme = useTheme();
  const router = useRouter();
  const classes = useAdminLayoutViewStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const routeChangeComplete = () => {
      setMobileOpen(false);
    };

    router.events.on('routeChangeComplete', routeChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', routeChangeComplete);
    };
  }, [router.events]);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        color="default"
        elevation={1}
        className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
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
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {props.drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
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
