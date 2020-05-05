import React from 'react';
import { Image, Form, Radio } from 'semantic-ui-react';
import styled from 'styled-components';

import avatars from '../avatars';

export default function AvatarSelection({ changed, checked }) {
  return (
    <>
      {avatars.map((shoe, index) => (
        <Container>
          <Image size="small" src={shoe} style={{ margin: '0.5rem' }} />
          <Form.Field>
            <Radio
              name="avatar"
              value={index.toString()}
              checked={checked === index.toString()}
              onChange={changed}
            />
          </Form.Field>
        </Container>
      ))}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;
