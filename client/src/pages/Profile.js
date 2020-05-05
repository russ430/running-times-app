import React from 'react';
import styled from 'styled-components';

import ProfileBox from '../components/Profile/ProfileBox/ProfileBox';
import PersonalBests from '../components/Profile/PersonalBests';
import UserRunFeed from '../components/UserRunFeed';

export default function Profile(props) {
  const { username } = props.match.params;

  return (
    <Container>
      <Left>
        <ProfileBox username={username} />
      </Left>
      <Right>
        <h1 style={{ textAlign: 'center', margin: '0', padding: '1rem 0' }}>
          Personal Bests
        </h1>
        <PersonalBests username={username} />
        <UserRunFeed username={username} />
      </Right>
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 3;
  padding: 0 1.5rem;

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;
