import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';
import useStyles from './styles';
const PrimarySearchAppBar = ({ isLogged, handleLogout }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const classes = useStyles();

  return (
    <>
      <AppBar position={"static"} className={"mb3" + classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="Kyra" height="25px" className={classes.image} />
          </Typography>
          <div className={classes.grow} />

          {isLogged === true ? <><div className={classes.button}>
            <Button color="inherit" onClick={() => { setMobileMenu(!mobileMenu); handleLogout() }} >Logout</Button>
          </div> </> :""}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default PrimarySearchAppBar;
