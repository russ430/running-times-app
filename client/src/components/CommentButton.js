import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function CommentButton({ data: { commentCount, id }}) {

  return(
    <MyPopup content="Comment on post">
      <Button labelPosition='right' as={Link} to={`/times/${id}`}>
        <Button color='teal' basic>
          <Icon name='comments' />
        </Button>
        <Label basic color='teal' pointing='left'>
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  );
}

export default CommentButton;
