// This is a custom hook that is used in the Register user page
// if you would like to see a standard implementation without custom hooks
// take a look at the Login page

import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const changedInputHandler = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const submitHandler = () => {
    callback();
  };

  return {
    changedInputHandler,
    submitHandler,
    values
  }
};
