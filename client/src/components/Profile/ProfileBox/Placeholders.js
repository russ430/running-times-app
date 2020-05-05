import React from 'react';
import { Placeholder } from 'semantic-ui-react';

export default function Placeholders() {
  return (
    <Placeholder>
      <Placeholder.Header>
        <Placeholder.Line length="medium" />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="long" />
        <Placeholder.Line length="long" />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line length="long" />
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="medium" />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line length="long" />
        <Placeholder.Line length="medium" />
      </Placeholder.Paragraph>
    </Placeholder>
  );
}
