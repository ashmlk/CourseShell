import React from 'react';
import { Box, Container, createMuiTheme, createStyles, CssBaseline, Grid, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core';
import GuestUserNavbar from '../components/Navbar/GuestUser';
import Searchbar from '../components/Textfield/Searchbar';
import styles from '../styles/Home.module.css'


export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3574f2",
    },
    secondary: {
      main: "#612aad",
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3574f2",
    },
    secondary: {
      main: "#612aad",
    },
  },
});


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  }),
);


export default function CourseShellMain() {
  return (
    <MuiThemeProvider theme={lightTheme}>
      <div>
        <CssBaseline /> 
        <GuestUserNavbar />
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh" width="100%">
          <Container>
            <Box display="flex" alignItems="center" justifyContent="center" width="100%">
              <Box width="100%" maxWidth="600px">
                <Searchbar />
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
    </MuiThemeProvider>
  )
}
