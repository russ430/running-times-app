import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import moment from 'moment';


function RecentRunFeed({ runData: { body, miles, time, createdAt, likeCount }}) {

  return (
      <Feed.Event style={{ padding: '1rem 0'}} className="recentRunFeed">
        <Feed.Content>
          <Feed.Summary>
            {miles} miles in {time}
          </Feed.Summary>
          <Feed.Date>{moment(createdAt).fromNow()}</Feed.Date>
          <Feed.Extra style={{ margin: '0', padding: '0.5rem 0' }}>
            {body}
          </Feed.Extra>
          <Feed.Like>
            <Icon name='like'/>{`${likeCount} ${likeCount === 1 ? 'Like' : 'Likes'}`}
          </Feed.Like>
        </Feed.Content>
      </Feed.Event>
  )
};

export default RecentRunFeed;
