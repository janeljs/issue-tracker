import React, { RefObject } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { issueFilterTypeState } from 'store/issueInfoStore';
import ModalContentList from './ModalContentList';
interface TabModalProps {
  modalRef: RefObject<HTMLDivElement>;
  className?: string;
}
interface filterObjType {
  key: string;
  name: string;
}
export default function TabModal({ modalRef, className }: TabModalProps) {
  const filterType = useRecoilValue<filterObjType>(issueFilterTypeState);

  if (!filterType.key) return null;
  return (
    <TabModalBlock className={className} filterType={filterType.key} ref={modalRef}>
      <div className='modal__header'>{filterType.name} 선택</div>
      <ModalContentList filterType={filterType.key} />
    </TabModalBlock>
  );
}

interface StyleProps {
  filterType: string;
}
const TabModalBlock = styled.div<StyleProps>`
  position: absolute;
  top: 50px;
  right: ${({ filterType, theme }) => `${theme.tabModalRightPosition[filterType]}px`};
  width: 240px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.2);
  .modal__header {
    background-color: ${({ theme }) => theme.color.bgGrey};
    padding: 8px 40px 8px 16px;
  }
  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
`;
