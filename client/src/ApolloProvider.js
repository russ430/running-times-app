import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
  uri: 'https://thawing-headland-44252.herokuapp.com/'
});

// this is created to pass forward the context of whether a 
// user is logged in (ie. there is a token) so that we can pass
// it forward when doing things (posting times, liking, etc) 
// that require to authorization
const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  // after grabbing the token we need to set in a header
  return {
    // adding the authorization header, need to check if we even have a token
    // if not add a blank auth code
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  }
});

// we must concatenate the authlink with the header to the httplink which will
// add the authorization header to any protected api calls (mutations/queries);
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
