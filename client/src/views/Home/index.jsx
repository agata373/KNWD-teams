import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { oneOf, string, number, object } from 'prop-types';
import { SVGIcon } from 'react-ui-framework';
import config from './particlesjs-config';
import LoadingScreen from '../../components/LoadingScreen';
import {
  Container,
  StyledParticles,
  CenterBox,
  Title,
  StyledButton,
  IconWrapper,
  Text,
} from './styles';

const goToGoogleLogin = () => {
  window.location.assign('/auth/google');
};

const renderLoading = () => <LoadingScreen text="Logowanie..." />;

const renderLogin = () => (
  <Container>
    <StyledParticles params={config} />
    <CenterBox>
      <Title>Zaloguj się do KNWD Teams</Title>
      <StyledButton onClick={goToGoogleLogin}>
        <IconWrapper>
          <SVGIcon path="svg/google-logo.svg" width={32} height={32} />
        </IconWrapper>
        <Text>Zaloguj przez Google</Text>
      </StyledButton>
    </CenterBox>
  </Container>
);

@connect(({ auth }) => ({ auth }))
class Home extends PureComponent {
  componentDidUpdate() {
    if (this.props.auth) {
      this.props.history.push('/tasks');
    }
  }

  render() {
    return this.props.auth === false ? renderLogin() : renderLoading();
  }
}

Home.propTypes = {
  auth: oneOf([null, false, { googleId: string, __v: number, _id: string }]),
  history: object,
};

export default Home;
