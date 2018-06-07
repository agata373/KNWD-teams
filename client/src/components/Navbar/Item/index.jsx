import React from 'react';
import { string, bool, func } from 'prop-types';
import { SVGIcon } from 'react-ui-framework';
import { Container, Text } from './styles';

const Item = ({ icon, name, active, onClick }) => (
  <Container active={active} onClick={onClick}>
    <SVGIcon path={icon} width={14} height={14} fill="#fff" />
    <Text>{name}</Text>
  </Container>
);

Item.propTypes = {
  icon: string.isRequired,
  name: string.isRequired,
  active: bool.isRequired,
  onClick: func.isRequired,
};

export default Item;
