import React, { useContext } from 'react';
import { AppContext } from '../core/contexts/app-context/appContext';
import './NavMenu.css';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserProfile } from '../models';

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
  


  return (
    <header>
      {renderNavBar(user, classes)}
    </header>
  );
}



function renderNavBar(user:UserProfile, classes) {


  if(!user){
  return <>
    <AppBar position="sticky">
      <Toolbar>
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
  else if(user.role=='administrator')
  {
    return <>
        <AppBar position="sticky">
      <Toolbar>
        <NavLink tag={Link} className="text-light" to="/">
        <Typography variant="h6" className={classes.title}>
          Colorizer
        </Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  </>
  }
  else if(user.role=='user')
  {
    return <>
        <AppBar position="sticky">
      <Toolbar>
        <NavLink tag={Link} className="text-light" to="/">
        <Typography variant="h6" className={classes.title}>
          Colorizer
        </Typography>
        </NavLink>
        <NavLink tag={Link} className="text-light" to="/contact">
        <Typography variant="h6" className={classes.title}>
        Contact
        </Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  </>
  }

}