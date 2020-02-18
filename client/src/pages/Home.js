import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import TimeCard from '../components/TimeCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Times</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? <h1>Loading times...</h1> : (data.getTimes.map(time => (
          <Grid.Column key={time.id} style={{ marginBottom: '20px' }}>
            <TimeCard data={time} />
          </Grid.Column>
        )))}
      </Grid.Row>
    </Grid>
  )
};

export default Home;
