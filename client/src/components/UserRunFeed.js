import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Item, Loader } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import TimeCard from './TimeCard';

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
        {!data ? <Loader size="big" active inline="centered" style={{ marginTop: '6rem' }} /> : (
          <Transition.Group as={Item.Group} divided duration={200} style={{ width: '95%', margin: '0 auto' }}>
            {allRuns.map(time => (
              <TimeCard type="profile" key={time.id} data={time} />
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  )
};

export default UserRunFeed;
