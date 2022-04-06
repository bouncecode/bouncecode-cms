/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 */

import Router from 'next/router';

// Material Core
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

// Icons
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AppsIcon from '@mui/icons-material/Apps';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import {useAdminLayoutViewStyles} from './styles';

/**
 * 관리자 레이아웃의 Drawer 입니다.
 */
export function AdminLayoutDrawerModule() {
  const classes = useAdminLayoutViewStyles();

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            color="textSecondary"
            className={classes.title}
            noWrap>
            <Link href="/" color="inherit">
              사이트 이름
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <List subheader={<ListSubheader>사이트 관리</ListSubheader>}>
        <ListItem button onClick={() => Router.push('/dashboard/settings')}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={'사이트 설정'} />
        </ListItem>
        <ListItem button onClick={() => Router.push('/dashboard/users')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary={'사용자 관리'} />
        </ListItem>
      </List>
      <Divider />
      <List subheader={<ListSubheader>콘텐츠 관리</ListSubheader>}>
        <ListItem button onClick={() => Router.push('/dashboard/menus')}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary={'메뉴 관리'} />
        </ListItem>
        <ListItem button onClick={() => Router.push('/dashboard/popups/write')}>
          <ListItemIcon>
            <WebAssetIcon />
          </ListItemIcon>
          <ListItemText primary={'팝업 관리'} />
        </ListItem>
        <ListItem button onClick={() => Router.push('/dashboard/pages/write')}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary={'페이지 관리'} />
        </ListItem>
        <ListItem button onClick={() => Router.push('/dashboard/boards/write')}>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary={'게시판 관리'} />
        </ListItem>
        <ListItem button onClick={() => Router.push('/dashboard/faqs/write')}>
          <ListItemIcon>
            <LiveHelpIcon />
          </ListItemIcon>
          <ListItemText primary={'FAQ 관리'} />
        </ListItem>
      </List>
    </div>
  );
}
