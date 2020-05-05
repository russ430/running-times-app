import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

// if there is a token to be found (meaning the user has signed in)
if (localStorage.getItem('jwtToken')) {
  // the jwt token holds in its value when the token expires
  // we must use a decoder (jwtDecode) in order to retrieve the expiration time
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);

  // if the decoded token is smaller (older) than the current time then
  // the token is expired and will be removed-- the user will be logged out (user in state will be set to null)
  // (expiration time is stored in EPOCH time in the exp of decoded token)
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');

    // if the token is not older/expired the state will be passed the token
    // and we will remain logged in
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    // this stores the user token after logging in to the local storage on the browser
    // this ensures that when the page refreshes or reloads the user stays logged in
    // the first argument for 'setItem' is the string name, and the second the actual item/value
    localStorage.setItem('jwtToken', userData.token);

    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    // need to make sure that we remove the token after loggin out
    localStorage.removeItem('jwtToken');

    dispatch({
      type: 'LOGOUT',
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
