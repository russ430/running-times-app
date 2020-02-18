import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';

function LikeButton({ user,  time: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false);
  }, [user, likes]);

  const [likeTime] = useMutation(LIKE_TIME_MUTATION, {
    variables: { timeId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color='teal' basic>
      <Icon name='heart' />
    </Button>
  )

  return (
    <Button as='div' labelPosition='right' onClick={likeTime}>
      {likeButton}
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
};

const LIKE_TIME_MUTATION = gql`
  mutation likeTime($timeId: ID!) {
    likeTime(timeId: $timeId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
