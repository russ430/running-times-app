import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Grid, Card, Form, Item, Loader } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import DeleteButton from '../components/DeleteButton';
import TimeCard from '../components/TimeCard';

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

  if(loading) {
    return (
      <Loader size="big" inline="centered" />
    )
  } else {
    const { id, comments } = data.getTime;
    return (
      <Grid style={{ padding: '5rem 0' }}>
        <Item.Group style={{ width: '60%', margin: '0 auto' }}>
          <TimeCard data={data.getTime} />
        </Item.Group>
        <Grid.Row >
          <Grid.Column style={{ width: '60%', margin: '0 auto' }}>
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
      miles
      time
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
