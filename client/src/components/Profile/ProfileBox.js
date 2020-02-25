import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Card, Image, Icon, Placeholder } from 'semantic-ui-react';
import { FETCH_USER_DATA_QUERY } from '../../util/graphql';
import moment from 'moment';

import avatars from '../avatars';
import BasicStats from './BasicStats';

function ProfileBox({ username }) {
  const { loading, data } = useQuery(FETCH_USER_DATA_QUERY, { 
    variables: { username }
  });

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
      ) : <Image src={avatars[userData.avatar]} wrapped ui={false} /> }
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
        <BasicStats username={username}/>
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
            {userData.location}
          </div>
        </Card.Content>
      )}
  </Card>
  )
};

export default ProfileBox;
