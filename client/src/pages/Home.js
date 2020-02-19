import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import TimeCard from '../components/TimeCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <>
      {user && (
          <Grid style={{ margin: '1rem 0' }} centered columns={2}>
            <Grid.Column  width={5}>
              <PostForm />
            </Grid.Column>
            <Grid.Column stretched width={8}>
              <Card fluid>
                <Card.Content>
                  <h1>My Stats</h1>
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
                    <TimeCard data={time} />
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
