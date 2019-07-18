import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "apollo-link-context";

import { AUTH_TOKEN } from "./utils/constants";

/**
 * 1 - You are importing the required dependecies from the installed packages
 */
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    header: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

/**
 * 2 - Here you create the httpLink that will connect your ApolloClient instance
 * with the GraphQL API, your Grapqhl server will be running on http://localhost:4000
 */

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

/**
 * 3 - Now you instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache
 */

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

/**
 * 4 - You render the root component of your React app. The App is wrapped with the higher-order
 * component Apollo Provider that gets passed the client as a prop
 */

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
