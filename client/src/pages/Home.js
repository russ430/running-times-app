import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Transition, Card, Item, Loader, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import WelcomeHeader from '../components/WelcomeHeader';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import BasicStats from '../components/Profile/BasicStats';
import PersonalBests from '../components/Profile/PersonalBests';
import TimeCard from '../components/TimeCard';

function Home() {
  const { user } = useContext(AuthContext);
  const [refetchData, setRefetchData] = useState(false);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  let firstSixTimes;
  if (data) {
    firstSixTimes = data.getTimes.slice(0, 6);
  }

  return (
    <>
      <Container user={user}>
        <Title className="title">We Run Here.</Title>
        {!user && (
          <WelcomeHeader />
        )}
        {user && (
          <LeftColumn>
            <PostContainer>
              <PostForm onSubmitHandler={() => setRefetchData(true)} />
            </PostContainer>
            <StatsContainer>
              <Card>
                <Card.Content>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Stats
                  </h2>
                  <BasicStats
                    username={user.username}
                    refetchData={refetchData}
                  />
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    Personal Bests
                  </h2>
                  <PersonalBests
                    home
                    username={user.username}
                    refetchData={refetchData}
                  />
                </Card.Content>
              </Card>
            </StatsContainer>
          </LeftColumn>
        )}
        <RunFeed>
          <h1 style={{ textAlign: 'center' }}>Recent Activity</h1>
          {loading ? (
            <Loader
              style={{ marginTop: '4rem' }}
              active
              inline="centered"
              size="big"
            />
          ) : (
            <Transition.Group
              animation="fade"
              as={Item.Group}
              divided
              duration={200}
              style={{ width: '100%' }}
            >
              {firstSixTimes.map(time => (
                <TimeCard key={time.id} type="home" data={time} />
              ))}
            </Transition.Group>
          )}
        </RunFeed>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 1rem 0;
  display: ${props => (props.user ? 'flex' : null)};

  .title {
    display: ${props => (props.user ? 'none' : null)};
  }

  @media screen and (max-width: 730px) {
    flex-direction: column;
  }
`;


const Title = styled.h1`
  font-size: 5rem;
  font-weight: 400;
  text-align: center;
  margin: 1rem 0;

  @media screen and (max-width: 800px) {
    font-size: 4rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 3.5rem;
  }
`;



const LeftColumn = styled.div`
  padding: 0 0.5rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 730px) {
    flex-direction: row-reverse;
    justify-content: space-around;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const PostContainer = styled.div`
  padding: 0 1rem;

  @media screen and (max-width: 730px) {
    margin: 2rem 0;
    flex: 1;
  }

  @media screen and (max-width: 600px) {
    width: 60%;
  }

  @media screen and (max-width: 550px) {
    width: 80%;
  }

  @media screen and (max-width: 410px) {
    width: 100%;
  }
`;

const StatsContainer = styled.div`
  margin-top: 2rem;

  @media screen and (max-width: 730px) {
    flex: 1;
    margin-top: 0;
  }
`;

const RunFeed = styled.div`
  width: 70%;
  margin: 1rem auto;
  flex: 3 1 auto;

  @media screen and (max-width: 1100px) {
    width: 80%;
  }

  @media screen and (max-width: 900px) {
    width: 90%;
  }

  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

export default Home;
