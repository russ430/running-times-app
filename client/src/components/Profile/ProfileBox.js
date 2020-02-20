import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Image, List, Icon, Placeholder } from 'semantic-ui-react';
import { FETCH_USER_DATA_QUERY } from '../../util/graphql';
import moment from 'moment';

function ProfileBox({ username }) {
  const { loading, data } = useQuery(FETCH_USER_DATA_QUERY, { variables: { username } })

  let userData = null;
  if(data) {
    userData = data.getUserData;
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
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="medium" />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line length="long" />
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
            <List.Content>
              <List.Header>How long have you been running?</List.Header>
              <List.Description>I've been running for about 5 years but have only recently really gotten serious.</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
                <List.Header>Your favorite place to run?</List.Header>
                <List.Description>I love running around the reservoir near my house!</List.Description>
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
