import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card, Item, Loader } from 'semantic-ui-react';

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

  return (
    <>
    <Grid centered columns={2}>
      {!user && (
        <div>
          hi
        </div>
      )}
      {user && (
          <Grid.Column width={4}>
            <Grid.Row>
              <PostForm onSubmitHandler={() => setRefetchData(true)} />
            </Grid.Row>
            <Grid.Row>
              <Card style={{ marginTop: '2rem' }}>
                <Card.Content>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Stats</h2>
                  <BasicStats username={user.username} refetchData={refetchData}/>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Personal Bests</h2>
                  <PersonalBests home username={user.username} refetchData={refetchData}/>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid.Column>
        )}
        <Grid.Column width={12}>
          <Grid columns={3}>
            <Grid.Row className="page-title">
              <h1>Recent Times</h1>
            </Grid.Row>
            <Grid.Row >
              {loading ? <Loader style={{ marginTop: '4rem' }} active inline="centered" size="big" /> : (
                <Transition.Group animation='fade' as={Item.Group} divided duration={200} style={{ width: '95%', margin: '0 auto' }}>
                  {data.getTimes.map(time => (
                    <TimeCard key={time.id} type="home" data={time} />
                  ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  )
};

export default Home;
