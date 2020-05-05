import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import MyPopup from '../util/MyPopup';

export default function LikeButton({ user, time: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likeTime] = useMutation(LIKE_TIME_MUTATION, {
    variables: { timeId: id },
    onError: error => console.log(error),
  });

  const likeButton = user ? (
    liked ? (
      <Button>
        <Icon name="heart" color="blue" />
      </Button>
    ) : (
      <Button>
        <Icon name="heart" color="grey" />
      </Button>
    )
  ) : (
    <Button to="/login" color="blue">
      <Icon name="heart" />
    </Button>
  );

  return (
    <MyPopup content={liked ? 'Unlike' : 'Like'}>
      <Container onClick={likeTime} isLiked={liked}>
        {likeButton}
        <span>{likeCount}</span>
      </Container>
    </MyPopup>
  );
}

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

const Container = styled.div`
  margin: 0 0.5rem;
  cursor: pointer;
  display: flex;

  span {
    color: ${props => (props.isLiked ? '#2185d0' : 'grey')};
    font-size: 1.2rem;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;

const Button = styled(Link)`
  border: none;
  cursor: pointer;

  .icon {
    font-size: 1.5em;

    @media screen and (max-width: 600px) {
      font-size: 1.2em;
    }
  }
`;
