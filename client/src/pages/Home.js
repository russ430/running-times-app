import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import TimeCard from '../components/TimeCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import BasicStats from '../components/Profile/BasicStats';
import PersonalBests from '../components/Profile/PersonalBests';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
    <Grid centered columns={2}>
      {user && (
          <Grid.Column width={4}>
            <Grid.Row>
              <PostForm />
            </Grid.Row>
            <Grid.Row>
              <Card style={{ marginTop: '2rem' }}>
                <Card.Content>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Stats</h2>
                  <BasicStats username={user.username}/>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Personal Bests</h2>
                  <PersonalBests home username={user.username}/>
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
              {loading ? <h1>Loading times...</h1> : (
                <Transition.Group duration={200}>
                  {data.getTimes.map(time => (
                    <Grid.Column key={time.id} style={{ marginBottom: '20px' }}>
                      <TimeCard type="home" data={time} />
                    </Grid.Column>
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
