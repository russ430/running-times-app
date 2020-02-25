import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function LikeButton({ user,  time: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    if(user && likes.find(like => like.username === user.username)) {
      setLiked(true)
    } else setLiked(false);
  }, [user, likes]);

  const [likeTime] = useMutation(LIKE_TIME_MUTATION, {
    variables: { timeId: id },
    onError: error => console.log(error)
  });

  const likeButton = user ? (
    liked ? (
      <Button color='blue'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='blue' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color='blue' basic>
      <Icon name='heart' />
    </Button>
  )

  return (
    <MyPopup content={liked ? "Unlike" : "Like"}>
      <Button as='div' labelPosition='right' onClick={likeTime}>
        {likeButton}
        <Label basic color='blue' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    </MyPopup>
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
