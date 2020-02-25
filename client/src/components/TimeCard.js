import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Item, Label } from 'semantic-ui-react';
import styles from './TimeCard.module.scss';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';

function NewTimeCard({ data: { id, body, miles, time, username, likeCount, likes, commentCount, createdAt }}) {
  const { user } = useContext(AuthContext);

  const windowScroll = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Item>
      <div className="ui small image" style={{ display: 'flex', alignItems: 'center' }}>
        <Link to={`/profile/${username}`} className={styles.figure} onClick={windowScroll}>
          <div style={{ position: 'relative' }}>
            <img className={styles.avatar} src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="avatar" />
            <h2 className={styles.caption}>{miles.length < 2 ? miles : parseFloat(miles).toFixed(1)}</h2>
          </div>
        </Link>
      </div>
      <Item.Content style={{ position: 'relative' }} verticalAlign="top">
          <Link to={`/profile/${username}`} style={{ fontSize: '1.5rem', fontWeight: '600', color: '#000', display: 'block', margin: '0', padding: '0' }} onClick={windowScroll}>{username}</Link>
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
    </Item>
  )
};

export default NewTimeCard;
