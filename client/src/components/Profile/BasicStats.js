import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List, Placeholder } from 'semantic-ui-react';
import { FETCH_USER_DATA_QUERY } from '../../util/graphql';

function BasicStats({ refetchData, username }) {
  const { data, refetch } = useQuery(FETCH_USER_DATA_QUERY, { variables: { username } })

  let runStats = null;
  if(data) {
    runStats = data.getUserData.runStats[0];
  };

  if (refetchData) {
    refetch();
  };

  return (
    <>
      {data ? (runStats.postedYet ? (
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
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{runStats.avgSpeed} mph</List.Header>
              <List.Description>Average Speed</List.Description>
            </List.Content>
          </List.Item>
        </List>
      ) : <h3>No stats yet</h3>
      ) : (
        <Placeholder>
          <Placeholder.Line length="short"/>
          <Placeholder.Line length="medium"/>
          <Placeholder.Line length="short"/>
          <Placeholder.Line length="medium"/>
          <Placeholder.Line length="short"/>
          <Placeholder.Line length="medium"/>
        </Placeholder>
      )}
    </>
  )
};

export default BasicStats;