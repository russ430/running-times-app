import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import TimeCard from '../components/TimeCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import BasicStats from '../components/Profile/BasicStats';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      {user && (
          <Grid centered columns={2}>
            <Grid.Column  width={5}>
              <PostForm />
            </Grid.Column>
            <Grid.Column width={6}>
              <Card fluid>
                <Card.Content>
                  <Grid centered columns={2}>
                    <Grid.Column stretched>
                      <h2 style={{ textAlign: 'center' }}>My Stats</h2>
                      <div style={{ margin: '0 auto'}}>
                        <BasicStats username={user.username}/>
                      </div>
                    </Grid.Column>
                    <Grid.Column stretched>
                      <h2 style={{ textAlign: 'center' }}>Personal Bests</h2>
                    </Grid.Column>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        )}
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
    </>
  )
};

export default Home;
