import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';

function SingleTime(props) {
  // extracting the timeId from the url
  const timeId = props.match.params.timeId;

  const { user } = useContext(AuthContext);

  const { data, loading } = useQuery(FETCH_TIME_QUERY, {
    variables: {
      timeId
    }
  });

  function deletteTimeCallback() {
    props.history.push('/');
  }

  if(loading) {
    return (
      <h1>Loading...</h1>
    )
  } else {
    const { id, body, createdAt, username, comments, commentCount, likes, likeCount } = data.getTime;
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
            floated='right'
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} time={{ id, likeCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log('comment on post')}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton timeId={id} callback={deletteTimeCallback}/>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

const FETCH_TIME_QUERY = gql`
  query($timeId: ID!) {
    getTime(timeId: $timeId) {
      id
      username
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        id
        createdAt
        body
      }
    }
  }
`;

export default SingleTime;
