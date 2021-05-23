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
    button: {
        borderRadius: '25px',
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
      <AppBar style={{background: '#fafafa'}} elevation={0} position="sticky">
          <Container>
            <Toolbar>
            <Typography color="primary" variant="h6" className={classes.title}>
                CourseShell
            </Typography>
            <Button className={classes.button} color="primary">Login</Button>
            <Button disableElevation className={classes.button} variant="contained" color="primary">Sign Up</Button>
            </Toolbar>
          </Container>
      </AppBar>
  );
}