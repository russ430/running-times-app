import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import MyPopup from '../util/MyPopup';

export default function CommentButton({ data: { commentCount, id } }) {
  return (
    <MyPopup content="Comment on post">
      <Container>
        <Button to={`/times/${id}`}>
          <Icon name="comments" color="teal" />
        </Button>
        <span>{commentCount}</span>
      </Container>
    </MyPopup>
  );
}

const Container = styled.div`
  margin: 0 0.5rem;
  cursor: pointer;
  display: flex;

  span {
    color: #96ddd9;
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
