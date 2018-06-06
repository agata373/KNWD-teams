import React from 'react';
import { Container, Center, Text } from './styles';

const LoadingScreen = ({ text }) => (
  <Container>
    <Center>
      ...
      <Text>{text}</Text>
    </Center>
  </Container>
);

LoadingScreen.defaultProps = {
  text: 'Ładowanie...',
};

export default LoadingScreen;
