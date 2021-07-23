import React, { ReactElement, RefObject } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  filterButtonRef: RefObject<HTMLDivElement>;
}

export default function IssueFilterBtn({ filterButtonRef }: Props): ReactElement {
  return (
    <IssueFilterBtnBlock ref={filterButtonRef}>
      <div>필터</div>
      <ExpandMoreIcon />
    </IssueFilterBtnBlock>
  );
}

const IssueFilterBtnBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-width: 72px;
  width: 128px;
  height: 40px;
  background: ${({ theme }) => theme.color.bgGrey};
  border-radius: 11px 0px 0px 11px;
  border-right: 1px solid ${({ theme }) => theme.color.lineGrey};
`;
