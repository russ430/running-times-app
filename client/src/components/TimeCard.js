import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import moment from 'moment';
import styled from 'styled-components';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';
import avatars from './avatars';
import { FETCH_USER_DATA_QUERY } from '../util/graphql';

export default function TimeCard({
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
  const { data } = useQuery(FETCH_USER_DATA_QUERY, {
    variables: { username },
  });

  const windowScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Card>
      {!data ? (
        <Loader size="big" inline="centered" />
      ) : (
        <>
          <Content>
            <LeftBlock>
              <ImageLink to={`/profile/${username}`} onClick={windowScroll}>
                <Avatar>
                  <AvatarImage
                    src={avatars[data.getUserData.avatar]}
                    alt={`${username}'s avatar`}
                  />
                  <CaptionContainer>
                    <ImageCaption>
                      {miles.length < 2 ? miles : parseFloat(miles).toFixed(1)}
                    </ImageCaption>
                  </CaptionContainer>
                </Avatar>
              </ImageLink>
            </LeftBlock>
            <RightBlock>
              <Header>
                <Username to={`/profile/${username}`} onClick={windowScroll}>
                  {data.getUserData.name}{' '}
                  <Meta>
                    @{username} | {moment(createdAt).fromNow()}
                  </Meta>
                </Username>
              </Header>
              <ContentBody>{body}</ContentBody>
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                }}
              >
                <ContentExtra>
                  <Label>
                    <Left>{miles} miles</Left>
                    <Right>{time}</Right>
                  </Label>
                  <div style={{ display: 'flex' }}>
                    <LikeButton user={user} time={{ id, likeCount, likes }} />
                    <CommentButton data={{ commentCount, id }} />
                  </div>
                </ContentExtra>
              </div>
              {user && user.username === username && (
                <DeleteButton timeId={id} />
              )}
            </RightBlock>
          </Content>
        </>
      )}
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  position: relative;

  &:not(:first-child) {
    border-top: 1px solid rgba(34, 36, 38, 0.15);
  }
`;

const LeftBlock = styled.div`
  position: relative;
  margin-right: 1.5rem;
  padding: 0;
`;

const AvatarImage = styled.img`
  border-radius: 0.125rem;
  border: none;
  transition: filter 0.2s ease;
  width: 120px;
  height: 120px;

  @media screen and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const CaptionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
`;

const ImageCaption = styled.h2`
  font-size: 6rem;
  letter-spacing: -0.5rem;
  margin: 0;
  transition: opacity 0.2s ease;
  padding-right: 1rem;
  text-align: center;
  color: #fff;

  @media screen and (max-width: 600px) {
    font-size: 5rem;
  }
`;

const ImageLink = styled(Link)`
  overflow: hidden;

  & img {
    filter: blur(1px);
  }

  &:hover img {
    filter: blur(0);
  }

  &:hover h2 {
    opacity: 0;
  }
`;

const Avatar = styled.div`
  position: relative;
  height: 120px;

  @media screen and (max-width: 600px) {
    height: 100px;
  }
`;

const RightBlock = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
`;

const Content = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
`;

const Username = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  display: block;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 800px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

const Meta = styled.span`
  color: grey;
  font-weight: 400;
  padding: 0;
  font-size: 1rem;

  @media screen and (max-width: 800px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const ContentBody = styled.p`
  overflow-wrap: break-word;
  font-size: 1.4rem;
  padding: 0;
  margin: 0.5rem 0;

  @media screen and (max-width: 800px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ContentExtra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const Label = styled.div`
  width: auto;
  border-radius: 0.28571429rem;
  display: flex;
  background-color: #2185d0;
`;

const Left = styled.div`
  font-size: 1.2rem;
  color: #fff;
  text-align: center;
  padding: 0.5rem 0.75rem;
  font-weight: 700;

  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }

  @media screen and (max-width: 800px) {
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
  }
`;

const Right = styled(Left)`
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0.8;
`;
