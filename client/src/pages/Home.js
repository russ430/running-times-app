import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import TimeCard from '../components/TimeCard';

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Times</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? <h1>Loading times...</h1> : (data.getTimes.map(time => (
          <Grid.Column key={time.id} style={{ marginBottom: '20px' }}>
            <TimeCard data={time} />
          </Grid.Column>
        )))}
      </Grid.Row>
    </Grid>
  )
};

const FETCH_POSTS_QUERY = gql`
{
    getTimes{
      id
      body
      miles
      time
      createdAt
      username
      likeCount
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
  }
}
`;

export default Home;
