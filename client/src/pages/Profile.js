import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Card, Image, Icon, Feed } from 'semantic-ui-react';
import RecentRunFeed from '../components/RecentRunFeed';
import runners from '../assets/runners.png';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import ProfileBox from '../components/Profile/ProfileBox';
import BasicStats from '../components/Profile/BasicStats';

function Profile(props) {
  const username = props.match.params.username

  const { data } = useQuery(FETCH_POSTS_QUERY);

  let userRuns;
  if(data) {
    const allRuns = data.getTimes.filter(time => time.username === username);
    if(allRuns.length < 2) {
    userRuns = allRuns;
  } else {
    userRuns = allRuns.slice(0, 2);
  }
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
              <Card.Header textAlign="center">Last{data && userRuns.length === 1 ? ' Run' : ' Two Runs'}</Card.Header>
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
            <h1 style={{ textAlign: 'center', margin: '0', padding: '1rem 0' }}>Stat Cast</h1>
            <Grid columns={2} centered>
              <Grid.Column>
                <BasicStats username={username} />
              </Grid.Column>
              <Grid.Column>
                <div>
                  <h1 style={{ textAlign: 'center' }}>Achievements</h1>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Grid.Column textAlign="center">
                    <Icon size="huge" name="trophy" color="yellow"/>
                    <div>
                      <h2 style={{ margin: '0' }}>6 miles</h2>
                      <h2 style={{ margin: '0', fontWeight: '400' }}>Longest Mileage</h2>
                    </div>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Icon size="huge" name="trophy" color="yellow"/>
                    <div>
                      <h2 style={{ margin: '0' }}>30:25</h2>
                      <h2 style={{ margin: '0', fontWeight: '400' }}>Longest Run</h2>
                    </div>
                  </Grid.Column>
                </div>
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
