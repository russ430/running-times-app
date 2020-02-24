import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import TimeCard from './TimeCard';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import NewTimeCard from './NewTimeCard';

function UserRunFeed({ username }) {
  const { data } = useQuery(FETCH_POSTS_QUERY);

  let allRuns;
  if(data) {
    allRuns = data.getTimes.filter(time => time.username === username);
  }

  return (
    <Grid columns={3} style={{ padding: '1.5rem 0' }}>
      <h1 style={{ margin: '0 auto', padding: '1rem 0' }}>Recent Runs</h1>
      <Grid.Row >
        {!data ? <h1>Loading times...</h1> : (
          <Transition.Group duration={200}>
            {allRuns.map(time => (
              <Grid.Column key={time.id} style={{ marginBottom: '20px' }}>
                <TimeCard type="profile" data={time} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
      <NewTimeCard />
    </Grid>
  )
};

export default UserRunFeed;
