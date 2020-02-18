import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { Button, Icon, Confirm } from 'semantic-ui-react';

function DeleteButton({ timeId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteTime, errors] = useMutation(DELETE_TIME_MUTATION, {
    // this update function is called once the mutation has successfully completed.
    // in this scenario we want to close the 'Confirm' component,
    // doing so by setting the confirm open to false
    update(proxy) {
      setConfirmOpen(false);
      // by reading the query from the cache we can access the data it's using to display posts
      // on our home page. assigning it to a variable allows us to manipulate it and rewrite it
      // back to the cache to update the home page's posts
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      // filtering out the id for the post that will be deleted
      proxy.writeQuery({ 
        query: FETCH_POSTS_QUERY,
        data: {
          getTimes: data.getTimes.filter(time => time.id !== timeId)
        }
      });
      if(callback) callback();
    },
    variables: {
      timeId
    },
    onError: () => console.log(errors)
  })


  return (
    <>
      <Button floated="right" as="div" color="red" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{ margin: '0' }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteTime}
        />
    </>
  )
};

const DELETE_TIME_MUTATION = gql`
  mutation deleteTime($timeId: ID!) {
    deleteTime(timeId: $timeId)
  }
`;

export default DeleteButton;
