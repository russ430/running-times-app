import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, List } from 'semantic-ui-react';

import { FETCH_PBEST_QUERY } from '../../util/graphql';
import ListItem from './PersonalBests/ListItem';
import GridItem from './PersonalBests/GridItem';

function PersonalBests({ home, username, refetchData }) {
  const { data, refetch } = useQuery(FETCH_PBEST_QUERY, { variables: { username }});

  let pBestData;
  if (data) {
    pBestData = data.getUserData.runStats[0]
  }

  if (refetchData) {
    refetch();
  }

  return (
    <>
    {home ? (data ? (pBestData.postedYet ? (
        <List style={{ margin: '0 auto' }}>
          <ListItem descriptor="miles" label="Farthest Run">{pBestData.longestRunMiles}</ListItem>
          <ListItem label="Longest Run">{pBestData.longestRunTime}</ListItem>
          <ListItem label="Quickest Pace">{pBestData.quickestPace}</ListItem>
        </List>
      ) : <h1 style={{ textAlign: 'center', fontWeight: '400', fontStyle: 'italic' }}>I haven't posted any times yet!</h1>
      ) : <h1>Loading...</h1>
    ) : (data ? (pBestData.postedYet ? (
      <Grid columns={3} style={{ padding: '1.5rem 0', borderBottom: '1px solid #eee' }}>
        <GridItem descriptor="miles" label="Farthest Run">{pBestData.longestRunMiles}</GridItem>
        <GridItem label="Longest Run">{pBestData.longestRunTime}</GridItem>
        <GridItem label="Quickest Pace">{pBestData.quickestPace}</GridItem>
      </Grid>
    ) : <h1 style={{ textAlign: 'center', fontWeight: '400', fontStyle: 'italic' }}>I haven't posted any times yet!</h1>
    ) : <h1>Loading...</h1>)}
    </>
  )
};

export default PersonalBests;
