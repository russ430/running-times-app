import React from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileBox from '../components/Profile/ProfileBox';
import PersonalBests from '../components/Profile/PersonalBests';
import UserRunFeed from '../components/UserRunFeed';

function Profile(props) {
  const username = props.match.params.username

  return (
    <Grid>
      <Grid.Column width={4}>
        <Grid.Column>
          <ProfileBox username={username} />
        </Grid.Column>
      </Grid.Column>
      <Grid.Column width={12}>
        <h1 style={{ textAlign: 'center', margin: '0', padding: '1rem 0' }}>Personal Bests</h1>
        <PersonalBests username={username} />  
        <UserRunFeed username={username} />
      </Grid.Column>
    </Grid>

  );
};

export default Profile;
