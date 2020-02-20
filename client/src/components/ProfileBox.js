import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Image, List, Icon, Placeholder } from 'semantic-ui-react';
import { FETCH_USER_DATA_QUERY } from '../util/graphql';
import moment from 'moment';

function ProfileBox({ username }) {
  const { loading, data } = useQuery(FETCH_USER_DATA_QUERY, { variables: { username } })

  let userData = null;
  let totalTime = null;
  let avgMile = null;
  if(data) {
    userData = data.getUserData;
    // total time is in database as total seconds, must convert to MM:SS format
    const totalSeconds = userData.runStats[0].totalTime;
    // getting the total minutes by dividing total seconds by 60 and removing the remainder
    const totalMins = (Math.floor(parseFloat(totalSeconds) / 60));
    // subtracting the total mins in seconds from the total seconds
    const seconds = totalSeconds - (totalMins * 60);
    // need to add a 0 in front of any single digit seconds,
    // otherwise a time like 12:09 would look like 12:9.
    if(seconds < 10) {
      totalTime = `${totalMins}:0${seconds}`;
    } else {
      totalTime = `${totalMins}:${seconds}`;
    }
    
    // average mile time requires dividing the total seconds by the total miles
    // and reformatting seconds/mile as MM:SS
    const avgSecondsMile = Math.floor(parseFloat(totalSeconds)/parseFloat(userData.runStats[0].totalMiles));
    // converting seconds per mile to minutes per mile (and losing the remainder)
    // eg. 7.33 mins/mile becomes 7 mins mile
    const avgMins = (Math.floor(avgSecondsMile/60));
    // finding the remainder as seconds
    const avgSeconds = avgSecondsMile - (avgMins * 60);
    // as with total time, making sure there is a 0 in front of single digit seconds
    if(avgSeconds < 10) {
      avgMile = `${avgMins}:0${avgSeconds}`;
    } else {
      avgMile = `${avgMins}:${avgSeconds}`;
    }
  }

  return (
    <Card>
      {loading ? (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      ) : <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} /> }
      <Card.Content>
        {loading ? (
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
              <Placeholder.Line length="long" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
          </Placeholder>
        ) : (
          <>
        <Card.Header>{userData.name}</Card.Header>
        <Card.Meta>
          <span className='date'>Joined {moment(userData.createdAt).format("MMMM YYYY")}</span>
        </Card.Meta>
        <List>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{totalTime}</List.Header>
              <List.Description>Total Time</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='stopwatch' />
            <List.Content>
              <List.Header>{avgMile}</List.Header>
              <List.Description>Average Mile</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name='road' />
            <List.Content>
              <List.Header>{userData.runStats[0].totalMiles}</List.Header>
              <List.Description>Total Miles</List.Description>
            </List.Content>
          </List.Item>
        </List>
        </>
        )}
      </Card.Content>
      {loading ? (
        <Card.Content extra>
          <Placeholder>
            <Placeholder.Line length="long" />
          </Placeholder>
        </Card.Content>
      ) : (
        <Card.Content extra>
          <div>
            <Icon name='map marker' />
            Boston, MA
          </div>
        </Card.Content>
      )}
  </Card>
  )
};

export default ProfileBox;
