import React from 'react';
import { Box, Container, createMuiTheme, createStyles, CssBaseline, Grid, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core';
import GuestUserNavbar from '../components/Navbar/GuestUser';
import Searchbar from '../components/Search/Searchbar';
import SearchbarText from '../components/Search/SearchbarText';
import styles from '../styles/Home.module.css'
import { ApolloConsumer, HttpLink } from '@apollo/client';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  }),
);


export default function CourseShellMain({
  graphqlURL = undefined as string
}) {
  return (
      <div>
        <CssBaseline /> 
        <GuestUserNavbar />
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh" width="100%">
          <Container>
            <Box mt={-10} width="100%">
                <SearchbarText />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box width="100%" maxWidth="600px">
                <ApolloConsumer>
                  {(client) => {
                    client.setLink(new HttpLink({ uri: graphqlURL }));
                    return <Searchbar graphqlClient={client}/>;
                  }}
                </ApolloConsumer>
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
  )
}


export const getServerSideProps = async ({req}) => {

  const graphqlURL: string = process.env.GRAPHQL_API_URL;

  return {
    props: {
      graphqlURL: graphqlURL
    }, 
  }
}