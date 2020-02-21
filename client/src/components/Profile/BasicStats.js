import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List } from 'semantic-ui-react';
import { FETCH_USER_DATA_QUERY } from '../../util/graphql';

function ProfileBox({ username }) {
  const { data } = useQuery(FETCH_USER_DATA_QUERY, { variables: { username } })

  let runStats = null;
  if(data) {
    runStats = data.getUserData.runStats[0];
    console.log(runStats);
  };


  return (
    <>
      {data ? (runStats.postedYet ? (
        <List>
          <List.Item>
            <List.Icon name='road' />
            <List.Content>
              <List.Header>{runStats.totalMiles === '0' ? 'No data yet' : runStats.totalMiles}</List.Header>
              <List.Description>Total Miles</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{runStats.totalTime === '0' ? 'No data yet' : runStats.totalTime}</List.Header>
              <List.Description>Total Time</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{runStats.avgMile === '0' ? 'No data yet' : runStats.totalTime}</List.Header>
              <List.Description>Average Mile</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{runStats.avgSpeed === 'Infinity' ? 'No data yet' : `${runStats.avgSpeed} mph`}</List.Header>
              <List.Description>Average Speed</List.Description>
            </List.Content>
          </List.Item>
        </List>
      ) : <h3>No stats yet, check back soon!</h3>
      ) : <p>loading...</p>}
    </>
  )
};

export default ProfileBox;