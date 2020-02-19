import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card, Image, Icon } from 'semantic-ui-react';
import RecentRunFeed from '../components/RecentRunFeed';

import { FETCH_POSTS_QUERY } from '../util/graphql';

function Profile(props) {
  const username = props.match.params.username
  
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  let userRuns;
  if(!loading) {
    userRuns = data.getTimes.filter(time => time.username === username);
    console.log(userRuns);
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Grid.Column>
          <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
              <Card.Header>Matthew</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in 2015</span>
              </Card.Meta>
              <Card.Description>
                I've just started running again after a couple years off
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                <Icon name='map marker' />
                Boston, MA
              </div>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column style={{ margin: '1rem 0' }}>
          <Card>
            <Card.Content>
              <Card.Header textAlign="center">Latest Runs</Card.Header>
              {!loading && (userRuns.map(run => 
                <RecentRunFeed key={run.id} runData={run} />
                ))}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Column>
      <Grid.Column width={12}>
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
