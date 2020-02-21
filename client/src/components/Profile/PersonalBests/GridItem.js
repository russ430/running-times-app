import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

function gridItem({ label, children, descriptor }) {

  return (
    <Grid.Column stretched>
      <h2 style={{ textAlign: 'center', fontWeight: '400' }}>{label}</h2>
      <div style={{ textAlign: "center" }}>
        <Icon size="huge" name="trophy" color="yellow"/>
        <h2 style={{ marginTop: '1rem', fontWeight: '400' }}>{children} {descriptor && `${descriptor}`}</h2>
      </div>
    </Grid.Column>
  );
};

export default gridItem;
