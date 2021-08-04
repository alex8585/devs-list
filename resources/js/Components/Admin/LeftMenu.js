import * as React from "react"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import DashboardIcon from "@material-ui/icons/Dashboard"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PeopleIcon from "@material-ui/icons/People"
import List from "@material-ui/core/List"

import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles((theme) => ({
  link: {
    "& .MuiButtonBase-root.Mui-disabled.MuiListItem-root.MuiListItem-gutters.active":
      {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        opacity: 1,
      },
  },
}))

const LeftMenu = () => {
  const current = route().current()
  //console.log(current)

  const classes = useStyles()

  return (
    <div>
      <List className={classes.link}>
        <a href="/admin">
          <ListItem
            button
            className={current == "dashboard" ? "active" : ""}
            disabled={current == "dashboard"}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </a>

        <a href="/admin/users">
          <ListItem
            button
            className={current == "users" ? "active" : ""}
            disabled={current == "users"}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </a>
        <a href="/admin/tags">
          <ListItem
            button
            className={current == "/admin/tags" ? "active" : ""}
            disabled={current == "/admin/tags"}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Tags" />
          </ListItem>
        </a>
      </List>
    </div>
  )
}
export default LeftMenu
