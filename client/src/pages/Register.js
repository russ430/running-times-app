import React, { useState, useContext } from 'react';
import { Form, Button, Modal } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import AvatarSelection from '../components/Register/AvatarSelection';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const initialState = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    location: '',
    avatar: '',
  };

  const { changedInputHandler, submitHandler, values } = useForm(
    registerUser,
    initialState,
  );

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // the second argument in useMutation is an options object,
    // the first instance in the object is a function/method called 'update'
    // this will trigger if the mutation is successfully exexcuted,
    // the first argument for 'update' is 'proxy' which contains metadata
    // the second argument is the result of the mutation
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError: err => {
      // graphQLErrors will return an array with multiple error objects
      // however our server code only returns one error object
      // therefore we only need to access the graphQLErrors array at index 0
      // the 'extensions' property will hold more properties including 'exceptions'
      // inside of 'extensions' we can access our errors object with all of our predefined server errors
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    // the variables property is the object which we will be sending with the mutation
    variables: values,
  });

  // all functions initialized with 'function' will be hoisted unlike functions
  // initialized with 'const', therefore we can access the addUser() function
  // before initialization
  function registerUser() {
    addUser();
  }

  return (
    <Container>
      <Form
        onSubmit={submitHandler}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Create a New Account</h1>
        <Form.Input
          type="text"
          label="Name"
          placeholder="Name"
          name="name"
          value={values.name}
          error={!!errors.name}
          onChange={changedInputHandler}
        />
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
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          error={!!errors.email}
          onChange={changedInputHandler}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          maxLength="16"
          value={values.password}
          error={!!errors.password}
          onChange={changedInputHandler}
        />
        <Form.Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          maxLength="16"
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={changedInputHandler}
        />
        <Form.Input
          type="text"
          label="Location"
          placeholder="Anywhere, USA"
          name="location"
          value={values.location}
          error={!!errors.location}
          onChange={changedInputHandler}
        />
        <Modal open={showModal}>
          <Modal.Header>Select an Avatar</Modal.Header>
          <Modal.Content style={{ display: 'flex', flexWrap: 'wrap' }}>
            <AvatarSelection
              checked={values.avatar}
              changed={changedInputHandler}
            />
          </Modal.Content>
          <Modal.Content>
            <Button primary onClick={() => setShowModal(false)}>
              Select
            </Button>
          </Modal.Content>
        </Modal>
        <Button
          type="button"
          color={errors.avatar ? 'red' : 'teal'}
          onClick={() => setShowModal(true)}
          style={{ display: 'block', margin: '0.5rem 0' }}
        >
          Select Avatar
        </Button>
        <Button type="submit" primary style={{ margin: '0.5rem 0' }}>
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
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  margin: 1rem auto;

  @media screen and (max-width: 1000px) {
    width: 70%;
  }

  @media screen and (max-width: 650px) {
    width: 90%;
  }
`;

const REGISTER_USER = gql`
  mutation register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
    $location: String!
    $avatar: String!
  ) {
    register(
      registerInput: {
        name: $name
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
        location: $location
        avatar: $avatar
      }
    ) {
      id
      name
      email
      name
      username
      createdAt
      location
      token
    }
  }
`;
export default Register;
