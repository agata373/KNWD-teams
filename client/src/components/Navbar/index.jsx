import React, { PureComponent, Fragment } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router';
import ReactSVG from 'react-svg';
import Item from './Item';
import items from './navItems';
import { Container, Logo, Items, Right, UserAvatar } from './styles';

@withRouter
class Navbar extends PureComponent {
  goToView = url => this.props.history.push(url);

  isItemActive = url => this.props.location.pathname.includes(url);

  render() {
    return (
      <Fragment>
        <Container>
          <Logo>MyLifeBoard</Logo>
          <Items>
            {items.map(({ url, icon, name }) => (
              <Item
                key={url}
                icon={icon}
                name={name}
                active={this.isItemActive(url)}
                onClick={() => this.goToView(url)}
              />
            ))}
          </Items>
          <Right>
            <ReactSVG path="svg/fa/light/bell.svg" width={16} height={16} fill="#fff" />
            <UserAvatar src="http://via.placeholder.com/200x200" />
          </Right>
        </Container>
      </Fragment>
    );
  }
}

Navbar.propTypes = {
  location: object,
  history: object,
};

export default Navbar;
