import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';

export default function TimeCard({
  type,
  data: {
    id,
    body,
    miles,
    time,
    username,
    likeCount,
    likes,
    commentCount,
    createdAt,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <>
      {type === 'home' ? (
        <Card fluid>
          <Card.Content>
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
            <Card.Header as={Link} to={`/profile/${username}`}>
              {username}
            </Card.Header>
            <Card.Meta as={Link} to={`/times/${id}`}>
              {moment(createdAt).format('ddd, h:mm a')}
            </Card.Meta>
            <Card.Description>
              <h3>
                {miles} miles in {time}
              </h3>
              <p style={{ fontSize: '1.5rem' }}>{body}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LikeButton user={user} time={{ id, likes, likeCount }} />
            <MyPopup content="Comment on post">
              <Button labelPosition="right" as={Link} to={`/times/${id}`}>
                <Button color="blue" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </MyPopup>
            {user && user.username === username && <DeleteButton timeId={id} />}
          </Card.Content>
        </Card>
      ) : (
        <Card fluid>
          <Card.Content>
            <Card.Header as={Link} to={`/times/${id}`}>
              {miles} miles in {time}
            </Card.Header>
            <Card.Meta as={Link} to={`/times/${id}`}>
              {moment(createdAt).format('ddd, h:mm a')}
            </Card.Meta>
            <Card.Description>
              <p style={{ fontSize: '1.5rem' }}>{body}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <LikeButton user={user} time={{ id, likes, likeCount }} />
            <MyPopup content="Comment on post">
              <Button labelPosition="right" as={Link} to={`/times/${id}`}>
                <Button color="blue" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </MyPopup>
          </Card.Content>
        </Card>
      )}
    </>
  );
}
