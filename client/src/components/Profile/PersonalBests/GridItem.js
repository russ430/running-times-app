import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export default function gridItem({ label, children, descriptor }) {
  return (
    <Grid.Column stretched>
      <Label>{label}</Label>
      <div style={{ textAlign: 'center' }}>
        <Icon size="huge" name="trophy" color="yellow" />
        <Label style={{ marginTop: '1rem' }}>
          {children} {descriptor && `${descriptor}`}
        </Label>
      </div>
    </Grid.Column>
  );
}

const Label = styled.h2`
  textalign: center;
  font-weight: 400;

  @media screen and (max-width: 900px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 820px) {
    font-size: 1.2rem;
  }
`;
