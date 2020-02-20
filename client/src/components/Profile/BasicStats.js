import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List } from 'semantic-ui-react';
import { FETCH_USER_DATA_QUERY } from '../../util/graphql';

function ProfileBox({ username }) {
  const { loading, data } = useQuery(FETCH_USER_DATA_QUERY, { variables: { username } })

  let runStats = null;
  if(data) {
    runStats = data.getUserData.runStats[0];
  };

  return (
    <>
      {!data ? <p>loading...</p> : (
        <List>
          <List.Item>
            <List.Icon name='road' />
            <List.Content>
              <List.Header>{runStats.totalMiles}</List.Header>
              <List.Description>Total Miles</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{runStats.totalTime}</List.Header>
              <List.Description>Total Time</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{runStats.avgMile}</List.Header>
              <List.Description>Average Mile</List.Description>
            </List.Content>
          </List.Item>
        </List>
      )}
    </>
  )
};

export default ProfileBox;