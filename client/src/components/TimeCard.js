import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Item, Label, Loader } from 'semantic-ui-react';
import styles from './TimeCard.module.scss';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';
import avatars from './avatars';
import { FETCH_USER_DATA_QUERY } from '../util/graphql';

function TimeCard({ type, data: { id, body, miles, time, username, likeCount, likes, commentCount, createdAt }}) {
  const { user } = useContext(AuthContext);
  const { data } = useQuery(FETCH_USER_DATA_QUERY, { 
    variables: { username }
  });

  const windowScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Item>
      {!data ? <Loader size="big" inline="centered" /> : (
        <>
        <div className="ui small image" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`/profile/${username}`} className={styles.figure} style={ type === 'profile' ? null : { overflow: 'hidden' } }onClick={windowScroll}>
            <div style={{ position: 'relative' }}>
              {type === 'profile' ? null : <img className={styles.avatar} src={avatars[data.getUserData.avatar]} alt="avatar" />}
              <h2 className={styles.caption} style={ type === 'profile' ? { color: '#000' } : { color: '#fff', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.1)' }} >{miles.length < 2 ? miles : parseFloat(miles).toFixed(1)}</h2>
            </div>
          </Link>
        </div>
        <Item.Content style={{ position: 'relative' }} verticalAlign="top">
            <Link to={`/profile/${username}`} style={{ fontSize: '1.5rem', fontWeight: '600', color: '#000', display: 'block', margin: '0', padding: '0' }} onClick={windowScroll}>{type === 'profile' ? data.getUserData.name : username}</Link>
            <p style={{ color: 'grey', fontWeight: '400', marginTop: '0.2rem', padding: '0' }}>{moment(createdAt).fromNow()}</p>
            <p style={{ overflowWrap: 'break-word', fontSize: '1.4rem', padding: '0', margin: '1.5rem 0' }}>{body}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Label size='big' color='blue' image>{miles} miles
                <Label.Detail>{time}</Label.Detail>
                </Label>
              </div>
              <div>
                <LikeButton user={user} time={{ id, likeCount, likes }}/>
                <CommentButton data={{ commentCount, id }} />
                {user && user.username === username && <DeleteButton timeId={id} />}
              </div>
            </div>
        </Item.Content>
        </>
      )}
    </Item>
  )
};

export default TimeCard;
