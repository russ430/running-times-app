import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card, Image, Icon, Feed } from 'semantic-ui-react';
import RecentRunFeed from '../components/RecentRunFeed';
import runners from '../assets/runners.png';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import ProfileBox from '../components/ProfileBox';

function Profile(props) {
  const username = props.match.params.username

  const { data } = useQuery(FETCH_POSTS_QUERY);

  let userRuns;
  if(data) {
    userRuns = data.getTimes.filter(time => time.username === username);
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Grid.Column>
          <ProfileBox username={username} />
        </Grid.Column>
        <Grid.Column style={{ margin: '1rem 0' }}>
          <Card>
            <Card.Content>
              <Card.Header textAlign="center">Latest Runs</Card.Header>
              <Feed>
                {data && (userRuns.map(run => 
                  <RecentRunFeed key={run.id} runData={run} />
                  ))}
              </Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Column>
      <Grid.Column width={12}>
        <Card fluid>
          <Image src={runners} wrapped ui={false}/>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Header style={{ padding: '1rem 0' }}textAlign="center">Achievements</Card.Header>
            <Grid columns={3} centered>
              <Grid.Column textAlign="center">
                <Icon size="huge" name="trophy" color="yellow"/>
                <div>
                  <h2>Mile PR!</h2>
                  <p>7:32</p>
                  <p>Matt just set a new PR on his mile!</p>
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Icon size="huge" name="trophy" color="yellow"/>
                <div>
                  <h2>Mile PR!</h2>
                  <p>7:32</p>
                  <p>Matt just set a new PR on his mile!</p>
                </div>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Icon size="huge" name="trophy" color="yellow"/>
                <div>
                  <h2>Mile PR!</h2>
                  <p>7:32</p>
                  <p>Matt just set a new PR on his mile!</p>
                </div>
              </Grid.Column>
            </Grid>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>

  );
};

export default Profile;
