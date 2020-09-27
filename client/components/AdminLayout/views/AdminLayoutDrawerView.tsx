/**
 * @author BounceCode, Inc.
 * @packageDocumentation
 * @module client.components.AdminLayout.views
 */

import Router from "next/router";

// Material Core
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";

// Icons
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AppsIcon from "@material-ui/icons/Apps";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import { useAdminLayoutViewStyles } from "../styles/AdminLayoutView.styles";

/**
 * 관리자 레이아웃의 Drawer 입니다.
 */
export function AdminLayoutDrawerView() {
  const classes = useAdminLayoutViewStyles();

  return (
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
}
