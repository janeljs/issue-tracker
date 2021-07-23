import React, { ReactElement, RefObject } from 'react';
import styled from 'styled-components';
import { UserType } from 'components/common/tabModal/tapDataType';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selectedUserState, issueTypeState, selectedAuthorState } from 'store/issueInfoStore';
import { controlLoginState } from 'store/loginStore';

interface ModalProps {
  modalRef: RefObject<HTMLDivElement>;
}
interface filterItmeType {
  key: string;
  select: string;
  value: string;
}
export default function IssueFilterModal({ modalRef }: ModalProps): ReactElement {
  const setIssueStatus = useSetRecoilState(issueTypeState);
  const setAuthorFilterSelect = useSetRecoilState(selectedAuthorState);
  const setAssigneeFilterSelect = useSetRecoilState(selectedUserState);
  const { loginData } = useRecoilValue(controlLoginState);

  const FILTER_LIST: filterItmeType[] = [
    { key: 'status', select: 'open', value: '열린 이슈' },
    { key: 'author', select: 'me', value: '내가 작성한 이슈' },
    { key: 'assignee', select: 'me', value: '나에게 할당된 이슈' },
    { key: 'status', select: 'close', value: '닫힌 이슈' },
  ];

  const handleFilterClick = ({ key, select }: filterItmeType) => {
    setAuthorFilterSelect(null);
    setAssigneeFilterSelect([]);
    if (key === 'status') {
      setIssueStatus(select);
      return;
    }

    const myInfo: UserType = {
      id: 11,
      userName: loginData?.userName as string,
      assigned: false,
      image: loginData?.avatarUrl as string,
    };
    if (key === 'author') setAuthorFilterSelect(myInfo);
    if (key === 'assignee') setAssigneeFilterSelect([myInfo]);
  };

  const filterList = FILTER_LIST.map((list, idx) => (
    <ModalItemBlock key={'filter' + idx} onClick={() => handleFilterClick(list)}>
      <div>{list.value}</div>
    </ModalItemBlock>
  ));

  return (
    <IssueFilterModalBlock ref={modalRef}>
      <div className='filter-modal__header'>이슈 필터</div>
      {filterList}
    </IssueFilterModalBlock>
  );
}

const IssueFilterModalBlock = styled.div`
  position: absolute;
  top: 15%;
  z-index: 9999;
  background-color: ${({ theme }) => theme.color.white};
  width: 240px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  border-radius: 16px;
  div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
  .filter-modal__header {
    padding: 10px;
    background-color: ${({ theme }) => theme.color.bgGrey};
    border: ${({ theme }) => theme.color.bgGrey};
    border-bottom: 1px solid ${({ theme }) => theme.color.lineGrey};
    border-radius: 16px 16px 0 0;
  }
`;

const ModalItemBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ theme }) => theme.color.white};
  &:last-child {
    border-radius: 0 0 16px 16px;
  }
`;
