// This is a custom hook that is used in the Register user page
// if you would like to see a standard implementation without custom hooks
// take a look at the Login page

import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const changedInputHandler = (event, { value, name }) => {
    
    if (name === 'avatar') {
      // not sure radio buttons require the separate deconstructing
      // in the parameters but this is the only way to get the proper name
      setValues({ ...values, avatar: value});
    } else {
      // checking if the maxlength of the body is at 126 chars
      // to let the user know they've reached the limit
      let maxLength = null;
      if (event.target.name === 'body') {
        maxLength = event.target.value.length === 126 ? true : false;
      }
  
      setValues({ ...values, [event.target.name]: event.target.value, maxLength });
    }

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
