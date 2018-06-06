import styled from 'styled-components';

export const Container = styled.div`
  user-select: none;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 var(--space-lg);
  background-color: var(--primary2);
  color: #fff;
`;

export const Logo = styled.div`
  margin-right: var(--space-lg);
  font-size: var(--font-lg);
  line-height: var(--font-lg);
  font-weight: var(--medium);
  text-transform: uppercase;
`;

export const Items = styled.div`
  display: flex;
  height: 100%;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

export const UserAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 100%;
  margin-left: var(--space-md);
`;
