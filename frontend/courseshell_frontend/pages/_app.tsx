import '../styles/globals.css'
import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { SchoolContext } from '../contexts/SchoolContext';
import { useLocalStorage } from '../hooks/LocalStorage';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';

const gqlClient = new ApolloClient({
  uri: process.env.GRAPHQL_API_URL + "/graphql/",
  cache: new InMemoryCache({
    addTypename: false
  })
});

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
  overrides: {
    MuiLink: {
      root: {
        color: '#448aff',
      }
    }
  }
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

export default function MyApp(props: AppProps){
  const { Component, pageProps } = props;

  const [schoolContextValue, setSchoolContextValue] = useLocalStorage("user-session-university",null);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if(jssStyles){
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>CourseShell</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MuiThemeProvider theme={lightTheme}>
        <SchoolContext.Provider value={[schoolContextValue, setSchoolContextValue]}>
          <ApolloProvider client={gqlClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </SchoolContext.Provider>
      </MuiThemeProvider>
    </>
  )
}

