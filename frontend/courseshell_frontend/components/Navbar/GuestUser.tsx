import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loginButton: {
        textTransform: 'capitalize'
    },
    signupButton: {
        backgroundColor: 'transparent',
        borderRadius: '25px',
        borderColor: 'white',
        textTransform: 'capitalize'
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function GuestUserNavbar(props) {
  const classes = useStyles();

  return (  
      <AppBar position="sticky">
          <Container>
            <Toolbar>
            <Typography variant="h6" className={classes.title}>
                CourseShell
            </Typography>
            <Button className={classes.loginButton} color="inherit">Login</Button>
            <Button className={classes.signupButton} variant="outlined" color="inherit">Sign Up</Button>
            </Toolbar>
          </Container>
      </AppBar>
  );
}