import React from 'react';
import styled from 'styled-components';

interface childrenType {
  children: string;
  className: string;
}
function Title({ children, className }: childrenType) {
  return <TitleBlock className={className}>{children}</TitleBlock>;
}
export default React.memo(Title);
const TitleBlock = styled.div`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.size.lg}px;
  font-weight: ${({ theme }) => theme.weight.bold};
`;
