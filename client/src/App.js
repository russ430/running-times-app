import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
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
import Footer from './components/Footer';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="main-page">
          <MenuBar />
          <Content>
            <Route exact path="/" component={Home} />
            {/* These AuthRoutes will check to see if the user is logged in.
                If the user is in fact logged in the AuthRoute will redirect the user 
                back to the homepage if they somehow navigate to the login or register page. */}
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/profile/:username" component={Profile} />
            <Route exact path="/times/:timeId" component={SingleTime} />
          </Content>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  padding: 1.5rem;

  @media screen and (max-width: 768px) {
    overflow: auto;
    padding: 1rem;
  }
`;
