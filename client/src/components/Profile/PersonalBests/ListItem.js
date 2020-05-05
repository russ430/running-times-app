import React from 'react';
import { List } from 'semantic-ui-react';

export default function listItem({ children, descriptor, label }) {
  return (
    <List.Item>
      <List.Icon size="small" name="trophy" color="yellow" />
      <List.Content>
        <List.Header>
          {children} {descriptor && `${descriptor}`}
        </List.Header>
        <List.Description>{label}</List.Description>
      </List.Content>
    </List.Item>
  );
}
