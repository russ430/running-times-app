import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';
import styles from './NewTimeCard.module.scss';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

function NewTimeCard({ data: { id, body, miles, time, username, likeCount, likes, commentCount, createdAt }}) {

  const { user } = useContext(AuthContext);

  return (

    <Item>
      <div className="ui small image" style={{ position: 'relative' }}>
        <div className={styles.figure}>
          <img className={styles.avatar} src="https://react.semantic-ui.com/images/avatar/large/matthew.png" alt="avatar" />
          <h2 className={styles.caption}>{miles}</h2>
        </div>
      </div>
      <Item.Content verticalAlign="top">
          <Link to={`/profile/${username}`} style={{ fontSize: '1.5rem', fontWeight: '600', color: '#000', display: 'block', margin: '0', padding: '0' }}>{username}</Link>
          <span style={{ color: 'grey', fontWeight: '400', margin: '0', padding: '0' }}>{moment(createdAt).fromNow()}</span>
          <p style={{ fontSize: '1.4rem', padding: '0', margin: '1.5rem 0' }}>{body}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ color: 'grey' }}>{miles} miles in {time}</p>
            <div>
              <LikeButton user={user} time={{ id, likeCount, likes }}/>
              <CommentButton data={{ commentCount, id }} />
            </div>
          </div>
      </Item.Content>
    </Item>
  )
};

export default NewTimeCard;
