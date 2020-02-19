import React from 'react';
import { Feed } from 'semantic-ui-react';
import moment from 'moment';


function RecentRunFeed({ runData: { body, miles, time, createdAt, likeCount }}) {

  return (
    <Feed className="recentRunFeed" style={{ padding: "0 0.5rem", paddingBottom: "0.5rem" }}>
      <Feed.Event>
        <Feed.Content>
          <Feed.Date>{moment(createdAt).fromNow()}</Feed.Date>
          <Feed.Summary>
            {miles} miles in {time}
          </Feed.Summary>
          <Feed.Extra text>
            {body}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
};

export default RecentRunFeed;
