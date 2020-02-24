import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { FETCH_POSTS_QUERY } from '../util/graphql';

import { useForm } from '../util/hooks';

function PostForm(props) {
  const { values, submitHandler, changedInputHandler } = useForm(postTimeCallback, {
    time: '',
    miles: '',
    body: '',
    maxLength: false
  });

  function resetForm() {
    values.time = '';
    values.miles = '';
    values.body = '';
    values.maxLength = false;
  }

  const onFormSubmitHandler = event => {
    event.preventDefault();
    submitHandler();
    props.onSubmitHandler();
  }

  const [postTime, { error }] = useMutation(POST_TIME_MUTATION, {
    update(proxy, result) {
      // this is how to gain access to the data that is in our cache;
      // the readQuery function gets the data that has already been
      // queried by the app and accesses it from the cache by using the same query
      // that requested that data in the first place.
      // essentially when a query/mutation is made the data for that query is saved in
      // the cache, we have the ability to access that data through the readQuery function.
      // by putting this data we've retrieved from the cache in a variable, we have access to it.
      // TL;DR = proxy.readQuery is directly accessing the current cache
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      // in order to persist our data into the cache we must write it into the cache using the
      // 'writeQuery' function and then accessing the getTimes query and adding our new post
      // to the front of the array and spreading the rest of it afterward
      proxy.writeQuery({ 
        query: FETCH_POSTS_QUERY,
        data: {
          getTimes: [result.data.postTime, ...data.getTimes]
        }
      });
      resetForm();
    },
    variables: values,
    onError: (error) => null
  })

  function postTimeCallback() {
    postTime();
  }

  return (
    <>
      <Form onSubmit={onFormSubmitHandler}>
        <h2>Post a new time:</h2>
        <Form.Field>
          <Form.Input
            placeholder="MM:SS"
            label="Time"
            name="time"
            error={error ? true : false}
            onChange={changedInputHandler}
            value={values.time}
          />
          <Form.Input
            placeholder="26.2"
            label="Mileage"
            name="miles"
            error={error ? true : false}
            onChange={changedInputHandler}
            value={values.miles}
          />
          <Form.Input
            placeholder="Crushed it!"
            label="How'd it go?"
            name="body"
            maxLength={126}
            onChange={changedInputHandler}
            value={values.body}
            />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {values.maxLength && (
        <div className="ui error message" style={{ marginBottom: '20px' }}>
          <ul className="list">
            <li>The max length of your description is 40 characters</li>
          </ul>
        </div>
      )}
      {error && (
        <div className="ui error message" style={{ marginBottom: '20px' }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  )
};

const POST_TIME_MUTATION = gql`
  mutation postTime($time: String!, $miles: String! $body: String!) {
    postTime(time: $time, miles: $miles, body: $body) {
      id
      time
      miles
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
