// This component will check if the user is logged in
// if true, the user will not be able to get to the register and login pages
// and will be redirected
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route 
      {...rest}
      render={props => 
        user ? <Redirect to ="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
