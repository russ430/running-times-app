import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Transition, Item, Loader } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import TimeCard from './TimeCard';

export default function UserRunFeed({ username }) {
  const { data } = useQuery(FETCH_POSTS_QUERY);

  let allRuns;
  if (data) {
    allRuns = data.getTimes.filter(time => time.username === username);
  }

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Recent Runs</h1>
      {!data ? (
        <Loader
          size="big"
          active
          inline="centered"
          style={{ marginTop: '6rem' }}
        />
      ) : (
        <Transition.Group as={Item.Group} divided duration={200}>
          {allRuns.map(time => (
            <TimeCard key={time.id} data={time} />
          ))}
        </Transition.Group>
      )}
    </>
  );
}
