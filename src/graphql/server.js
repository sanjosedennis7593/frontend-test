import {
    ApolloClient,
    InMemoryCache,
  } from "@apollo/client";
  
const Client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `bearer ${process.env.REACT_APP_GIT_TOKEN}`
    }
});

export default Client;