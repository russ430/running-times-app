import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Grid, Image, Card, Button, Label, Icon, Form } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SingleTime(props) {
  // extracting the timeId from the url
  const timeId = props.match.params.timeId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null)

  const [comment, setComment] = useState('');

  const { data, loading } = useQuery(FETCH_TIME_QUERY, {
    variables: {
      timeId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      // removing the focus on the comment input box after posting a comment
      commentInputRef.current.blur();
    },
    variables: {
      timeId,
      body: comment
    }
  })

  function deleteTimeCallback() {
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
                <MyPopup content="Comment on Post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => commentInputRef.current.focus()}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {user && user.username === username && (
                  <DeleteButton timeId={id} callback={deleteTimeCallback}/>
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment..."
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        ref={commentInputRef}
                        />
                        <button 
                          type="submit"
                          className="ui button teal"
                          disabled={comment.trim() === ''}
                          onClick={submitComment}>
                            Submit
                        </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments && comments.map(comment => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton timeId={id} commentId={comment.id}/>
                  )}
                  <Card.Header>
                    {comment.username}
                  </Card.Header>
                  <Card.Meta>
                    {moment(comment.createdAt).fromNow()}
                  </Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($timeId: ID!, $body: String!) {
    postComment(timeId: $timeId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

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
