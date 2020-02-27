import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Card, Item, Loader, Icon } from 'semantic-ui-react';

import Register from './Register';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import BasicStats from '../components/Profile/BasicStats';
import PersonalBests from '../components/Profile/PersonalBests';
import TimeCard from '../components/TimeCard';

function Home() {
  const { user } = useContext(AuthContext);
  const [refetchData, setRefetchData] = useState(false);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  let firstSixTimes;
  if (data) {
    firstSixTimes = data.getTimes.slice(0, 6);
  }

  return (
    <>
    <Grid centered columns={2}>
      {!user && (
        <header style={{ padding: '2rem 0 6rem 1rem', display: 'flex', textAlign: 'left' }}>
          <div style={{ width: '45%', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', fontWeight: '400', fontSize: '5rem'}}>We Run Here.</h1>
            <h2 style={{ textAlign: 'left', fontWeight: '400' }}>Whether you're a lifelong runner or just getting started, welcome to your new home for all things running!</h2>
            <div style={{ display: 'flex', justifyContent: 'center', width: '90%', margin: '0 auto' }}>
              <div>
                <Icon name="clipboard list" size="massive" color="blue" style={{ margin: '2rem 0' }}/>
                <Icon name="trophy" size="massive" color="yellow" style={{ margin: '2rem 0' }}/>
              </div>  
              <div style={{ margin: '0 auto' }}>
                <div style={{ margin: '3rem 0 0 0' }}>
                  <h3 style={{ fontSize: '2rem', padding: '0', margin: '0' }}>Stats</h3>
                  <p style={{ fontSize: '1.2rem', padding: '0', margin: '0.5rem 0 0 0' }}>From total miles to average speed we keep track of all your stats!</p>
                </div>
                <div style={{ margin: '5rem 0 0 0' }}>
                  <h3 style={{ fontSize: '2rem', padding: '0', margin: '0' }}>Personal Bests</h3>
                  <p style={{ fontSize: '1.2rem', padding: '0', margin: '0.5rem 0 0 0' }}>Everytime you hit a new personal best everyone will see it on your profile!</p>
                </div>
              </div>  
            </div>
            <h2 style={{ marginTop: '3rem', fontStyle: 'italic', textAlign: 'left', fontWeight: '400' }}>We look forward to meeting you! Scroll down below to see what our community has been up to and click on a username or picture to see their profile!</h2>
          </div>
        <div style={{ width: '45%', marginLeft: '0 auto', paddingTop: '2rem' }}>
          <Register />
        </div>
      </header>
      )}
      {user && (
          <Grid.Column width={4}>
            <Grid.Row>
              <PostForm onSubmitHandler={() => setRefetchData(true)} />
            </Grid.Row>
            <Grid.Row>
              <Card style={{ marginTop: '2rem' }}>
                <Card.Content>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Stats</h2>
                  <BasicStats username={user.username} refetchData={refetchData}/>
                  <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Personal Bests</h2>
                  <PersonalBests home username={user.username} refetchData={refetchData}/>
                </Card.Content>
              </Card>
            </Grid.Row>
          </Grid.Column>
        )}
        <Grid.Column width={12} style={{ paddingBottom: '6rem' }}>
          <Grid columns={3}>
            <Grid.Row className="page-title">
              <h1>Recent Activity</h1>
            </Grid.Row>
            <Grid.Row >
              {loading ? <Loader style={{ marginTop: '4rem' }} active inline="centered" size="big" /> : (
                <Transition.Group animation='fade' as={Item.Group} divided duration={200} style={{ width: '95%', margin: '0 auto' }}>
                  {firstSixTimes.map(time => (
                    <TimeCard key={time.id} type="home" data={time} />
                  ))}
                </Transition.Group>
              )}
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid>
    </>
  )
};

export default Home;
