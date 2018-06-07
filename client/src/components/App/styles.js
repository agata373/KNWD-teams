import styled from 'styled-components';
import { Index } from 'react-ui-framework';

const placeForNavbar = `
  .mainBody {
    top: 40px;
    height: calc(100% - 40px);
  }
`;

export const StyledIndex = styled(Index)`
  min-width: 100vw;
  min-height: 100vh;
  ${props => !props.isRootUrl && placeForNavbar};
`;
