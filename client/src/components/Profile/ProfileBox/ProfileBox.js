import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Icon, Placeholder } from 'semantic-ui-react';
import styled from 'styled-components';
import moment from 'moment';

import { FETCH_USER_DATA_QUERY } from '../../../util/graphql';
import avatars from '../../avatars';
import BasicStats from '../BasicStats';
import Placeholders from './Placeholders';

export default function ProfileBox({ username }) {
  const { loading, data } = useQuery(FETCH_USER_DATA_QUERY, {
    variables: { username },
  });

  let userData = null;
  if (data) {
    userData = data.getUserData;
  }

  return (
    <Card>
      {loading ? (
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
      ) : (
        <Image>
          <Avatar src={avatars[userData.avatar]} alt="avatar" />
        </Image>
      )}
      <Content>
        {loading ? (
          <Placeholders />
        ) : (
          <>
            <div className="content-respon">
              <Header>{userData.name}</Header>
              <Meta>
                <span className="date">
                  Joined {moment(userData.createdAt).format('MMMM YYYY')}
                </span>
              </Meta>
              <BasicStats username={username} />
            </div>
            <ResponsiveExtra>
              <Icon name="map marker" />
              {userData.location}
            </ResponsiveExtra>
          </>
        )}
      </Content>
      {loading ? (
        <Content extra>
          <Placeholder>
            <Placeholder.Line length="long" />
          </Placeholder>
        </Content>
      ) : (
        <Extra>
          <Icon name="map marker" />
          {userData.location}
        </Extra>
      )}
    </Card>
  );
}

const Card = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 290px;
  min-height: 0;
  background: #fff;
  padding: 0;
  border: none;
  border-radius: 0.28571429rem;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;

  @media screen and (max-width: 800px) {
    flex-direction: row;
    width: 80%;
    margin: 1rem auto;
  }

  @media screen and (max-width: 700px) {
    width: 95%;
  }

  @media screen and (max-width: 500px) {
    width: 90%;
    flex-direction: column;
  }
`;

const Image = styled.div`
  width: 100%;
  position: relative;
  display: block;
  padding: 0;
  flex: 0 0 auto;

  @media screen and (max-width: 800px) {
    width: 50%;
  }

  @media screen and (max-width: 600px) {
    width: 60%;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: inherit,
  border: none;
`;

const Content = styled.div`
  flex-grow: 1;
  border: none;
  border-top: 1px solid rgba(34, 36, 38, 0.1);
  background: 0 0;
  margin: 0;
  padding: 1em 1em;
  box-shadow: none;
  font-size: 1em;
  border-radius: 0;

  .content-respon {
    padding: 0;

    @media screen and (max-width: 800px) {
      padding: 1rem;
    }
  }

  @media screen and (max-width: 800px) {
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
  }
`;

const Header = styled.div`
  font-size: 1.25rem;
`;

const Meta = styled.div`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.4);
`;

const Extra = styled.div`
  max-width: 100%;
  min-height: 0 !important;
  flex-grow: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  position: static;
  background: 0 0;
  width: auto;
  margin: 0 0;
  padding: 0.75em 1em;
  top: 0;
  left: 0;
  color: rgba(0, 0, 0, 0.4);

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const ResponsiveExtra = styled(Extra)`
  @media screen and (max-width: 800px) {
    display: block;
  }

  @media screen and (min-width: 801px) {
    display: none;
  }
`;
