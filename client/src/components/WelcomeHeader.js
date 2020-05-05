import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

import Register from '../pages/Register';

export default function welcomeHeader() {
  return (
    <Header>
      <Welcome>
        <Subtitle>
          Whether you're a lifelong runner or just getting started, welcome to
          your new home for all things running!
        </Subtitle>
        <Data>
          <DataSet>
            <Icon name="trophy" color="yellow" />
            <DataHeader>Personal Bests</DataHeader>
            <DataText>
              Everytime you hit a new personal best everyone will see it on your
              profile!
            </DataText>
          </DataSet>
          <DataSet>
            <Icon name="clipboard list" color="blue" />
            <DataHeader>Stats</DataHeader>
            <DataText>
              From total miles to average speed we keep track of all your stats!
            </DataText>
          </DataSet>
        </Data>
        <Subtitle>
          We look forward to meeting you! Scroll down below to see what our
          community has been up to and click on a username or picture to see
          their profile!
        </Subtitle>
      </Welcome>
      <Register />
    </Header>
  );
}

const Header = styled.header`
  padding: 2rem 0 6rem 0;
  display: flex;
  text-align: left;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    padding: 0;
  }
`;

const Welcome = styled.div`
  width: 45%;
  margin: 1rem auto;

  @media screen and (max-width: 1000px) {
    width: 95%;
    padding: 0 0.5rem;
  }
`;

const Subtitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 400;
  text-align: center;
  margin: 1rem 0;

  @media screen and (max-width: 800px) {
    font-size: 1.6rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const Data = styled.div`
  display: flex;
  justify-content: center;
  margin: 3.5rem 0;

  @media screen and (max-width: 500px) {
    margin: 2rem 0;
  }
`;

const DataSet = styled.div`
  flex: 1;
  text-align: center;
  margin: 2rem 0.5rem 0 0.5rem;

  .icon {
    font-size: 6em;

    @media screen and (max-width: 500px) {
      font-size: 4em;
    }
  }
`;

const DataHeader = styled.h3`
  font-size: 2rem;
  padding: 0;
  margin: 0;
  margin-top: -1rem;

  @media screen and (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const DataText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.2rem;

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
