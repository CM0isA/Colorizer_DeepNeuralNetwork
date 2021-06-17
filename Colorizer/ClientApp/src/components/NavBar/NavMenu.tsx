import React, { useContext, useState } from 'react';
import { AppContext } from '../core/contexts/app-context/appContext';
import './NavMenu.css';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function NavMenu() {
  const { appState } = useContext(AppContext);
  const { user } = appState;

  const classes = useStyles();

  function renderNavBar() {
    return <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <NavLink tag={Link} className="text-light" to="/">
          <Typography variant="h6" className={classes.title}>
            Colorizer
          </Typography>
          </NavLink>
          <NavLink tag={Link} className="text-light" to="/login">
          <Typography variant="h6" className={classes.title}>
          Login
          </Typography>
          </NavLink>

        </Toolbar>
      </AppBar>

    </>
  }

  return (
    <header>
      {renderNavBar()}
    </header>
  );
}
