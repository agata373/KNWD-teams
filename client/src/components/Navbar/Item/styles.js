import styled from 'styled-components';

const activeContainer = `
  border-bottom: 2px solid var(--accent1);
  background-color: var(--primary3);
  cursor: default;
  &:hover { background-color: var(--primary3); }
  > p { font-weight: var(--medium); }
`;

const inActiveContainer = `
  border-bottom: 2px solid transperent;
    background-color: var(--primary2);
    cursor: pointer;
    &:hover { background-color: var(--primary2-hover); }
    > p { font-weight: var(--regular); }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 12px;
  transition: all 0.3s var(--ease-out);
  ${props => (props.active ? activeContainer : inActiveContainer)};
`;

export const Text = styled.p`
  padding-left: var(--space-sm);
  font-size: var(--font-sm);
  line-height: var(--font-sm);
  font-weight: var(--regular);
  color: #fff;
`;
