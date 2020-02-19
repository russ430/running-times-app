import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth'; 
import AuthRoute from './util/AuthRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/MenuBar';
import SingleTime from './pages/SingleTime';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          {/* These AuthRoutes will check to see if the user is logged in.
              If the user is in fact logged in the AuthRoute will redirect the user 
              back to the homepage if they somehow navigate to the login or register page. */}
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/profile/:username' component={Profile} />
          <Route exact path="/times/:timeId" component={SingleTime } />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
