import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function Register(props) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const changedInputHandler = e => {
    setValues({ ...values, [e.target.name]: e.target.value});
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // the second argument in useMutation is an options argument
    // in this case we are creating a function called 'update'
    // this will trigger if the mutation is successfully exexcuted
    // the first argument for update is 'proxy' which contains metadata
    // the second argument is the result of the mutation
    update(proxy, result){
      console.log(result);
      props.history.push('/')
    },
    onError(err){
      // graphQLErrors will return an array with multiple error objects
      // however our server code only returns one error object
      // therefore we only need to access the graphQLErrors array at index 0
      // the 'extensions' property will hold more properties including 'exceptions'
      // inside of 'extensions' we can access our errors object with all of our predefined server errors
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    // the third argument is the variables object that we will be sending with the mutation
    variables: values
  });

  const onFormSubmitHandler = e => {
    e.preventDefault();
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onFormSubmitHandler} noValidate className={loading ? "loading" : ''}>
        <h1>Register</h1>
        <Form.Input
          type="text"
          label="Name"
          placeholder="Name"
          name="name"
          value={values.name}
          error={errors.name ? true : false}
          onChange={changedInputHandler}
        />
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
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
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

const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        name: $name
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ){
      id
      name
      email
      name
      username
      createdAt
      token
    }
  }
`;
export default Register;
