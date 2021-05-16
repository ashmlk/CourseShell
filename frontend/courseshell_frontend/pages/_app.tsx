import '../styles/globals.css'
import React, { useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const gqlClient = new ApolloClient({
  uri: process.env.API_URL + "/graphql/",
  cache: new InMemoryCache({
    addTypename: false
  })
});

export default function MyApp(props: AppProps){
  const { Component, pageProps } = props;

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
      <ApolloProvider client={gqlClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

