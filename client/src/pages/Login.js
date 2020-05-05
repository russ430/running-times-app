import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const changedInputHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({});
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    // the second argument of update is the result of the mutation
    // we destructure it and rename it userData to make it easier to understand
    // userData = what the graphql mutation returns
    // in this case id, username, and token
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onLoginSubmitHandler = e => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Container>
      <Form
        onSubmit={onLoginSubmitHandler}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={!!errors.username}
          onChange={changedInputHandler}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          error={!!errors.password}
          onChange={changedInputHandler}
        />
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Register>
        Don't have an account yet? Sign up for one
        <Link to="/register"> here</Link>.
      </Register>
    </Container>
  );
}

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Register = styled.p`
  font-size: 1.5rem;
  margin: 2rem auto;
  text-align: center;
  padding: 0 1rem;
`;

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;
