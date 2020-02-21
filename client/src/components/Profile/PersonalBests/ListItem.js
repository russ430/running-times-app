import React from 'react';
import { List } from 'semantic-ui-react';

function listItem(props) {

  return (
    <List.Item>
      <List.Icon size="small" name="trophy" color="yellow"/>
      <List.Content>
        <List.Header>{props.children} {props.descriptor && `${props.descriptor}`}</List.Header>
        <List.Description>{props.label}</List.Description>
      </List.Content>
    </List.Item>
  )
};

export default listItem;
