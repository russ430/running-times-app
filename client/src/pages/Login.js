import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Login(props) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const changedInputHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value});
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result){
      props.history.push('/')
    },
    onError(err){
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const onLoginSubmitHandler = e => {
    e.preventDefault();
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onLoginSubmitHandler} noValidate className={loading ? "loading" : ''}>
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={changedInputHandler}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={changedInputHandler}
        />
        <Button type="submit" primary>Submit</Button>
      </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
              ))}
            </ul>
          </div>)}
    </div>
  )
};

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password){
      id
      username
      token
    }
  }
`;
export default Login;
