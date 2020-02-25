import React from 'react';
import { Image, Form, Radio } from 'semantic-ui-react';
import avatars from '../avatars';

function AvatarSelection(props) {

  return (
    <>
      {avatars.map((shoe, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
          <Image size="small" src={shoe} style={{ margin: '0.5rem'}}/>
          <Form.Field>
            <Radio name="avatar" value={index} onClick={props.changed}/>
          </Form.Field>
        </div>
      ))}
      </>
  );
};

export default AvatarSelection;
