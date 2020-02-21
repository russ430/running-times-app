import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Icon } from 'semantic-ui-react';
import { FETCH_PBEST_QUERY } from '../../util/graphql';

function Achievements({ username }) {
  const { data } = useQuery(FETCH_PBEST_QUERY, { variables: { username }});

  let pBestData;
  if (data) {
    pBestData = data.getUserData.runStats[0]
  }

  return (
    <>
    {data ? (
      <Grid columns={3} style={{ padding: '1.5rem 0', borderBottom: '1px solid #eee' }}>
        <Grid.Column stretched>
          <h2 style={{ textAlign: 'center', fontWeight: '400' }}>Farthest Run</h2>
          <div style={{ textAlign: "center" }}>
            <Icon size="huge" name="trophy" color="yellow"/>
            <h2 style={{ marginTop: '1rem', fontWeight: '400' }}>{pBestData.longestRunMiles} miles</h2>
          </div>
        </Grid.Column>
        <Grid.Column stretched>
          <h2 style={{ textAlign: 'center', fontWeight: '400' }}>Longest Time</h2>
          <div style={{ textAlign: "center" }}>
            <Icon size="huge" name="trophy" color="yellow"/>
            <h2 style={{ marginTop: '1rem', fontWeight: '400' }}>{pBestData.longestRunTime}</h2>
          </div>
        </Grid.Column>
        <Grid.Column stretched>
          <h2 style={{ textAlign: 'center', fontWeight: '400' }}>Quickest Pace</h2>
          <div style={{ textAlign: "center" }}>
            <Icon size="huge" name="trophy" color="yellow"/>
            <h2 style={{ marginTop: '1rem', fontWeight: '400' }}>{pBestData.quickestPace}</h2>
          </div>
        </Grid.Column>
      </Grid>
    ) : <h1>Loading...</h1>}
    </>
  )
};

export default Achievements;
