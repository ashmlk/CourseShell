import React from 'react';
import Searchbar from '../components/Textfield/Searchbar';
import { Box, Container, createMuiTheme, Grid, MuiThemeProvider } from '@material-ui/core';
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


export default function CourseShellMain() {
  return (
    <MuiThemeProvider theme={lightTheme}>
        <Container>
          <Box  display="flex" alignItems="center" justifyContent="center" height="100vh">
            <Box width="100%" maxWidth="600px">
              <Searchbar />
            </Box>
          </Box>
        </Container>
    </MuiThemeProvider>
  )
}
