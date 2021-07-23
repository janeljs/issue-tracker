import React, { ReactElement } from 'react';
import styled from 'styled-components';
import LabelSelectItem from 'components/common/tabModal/LabelSelectItem';
import MilestoneSelectItem from 'components/common/tabModal/MilestoneSelectItem';
import UserSelectItem from 'components/common/tabModal/UserSelectItem';
import AuthorSelectItem from './AuthorSelectItem';
import { getTabInfoState, selectedTabState } from 'store/issueInfoStore';
import { useRecoilValue } from 'recoil';
import { UserType, LabelType, MilestoneType } from 'components/common/tabModal/tapDataType';

interface ModalContentListProps {
  filterType: string;
}

export default function ModalContentList({ filterType }: ModalContentListProps): ReactElement {
  const selectedTab = useRecoilValue(selectedTabState);
  const tabInfo = useRecoilValue(getTabInfoState);
  const isSelectedTabItem = (type: string, id: number, selected?: boolean) => {
    if (selected) return true;
    const selectedData = selectedTab[type];
    if (selectedData instanceof Array) {
      for (const data of selectedData) {
        if (data.id === id) return true;
      }
    } else {
      if (selectedData?.id === id) return true;
    }
    return false;
  };

  interface contentListType {
    assignee: (type: string) => JSX.Element[];
    label: (type: string) => JSX.Element[];
    milestone: (type: string) => JSX.Element[];
    [key: string]: any;
  }

  const getContentList: contentListType = {
    assignee: (type: string): JSX.Element[] => {
      const userData = tabInfo[type] as Array<UserType>;
      return userData.map((user) => {
        const selected = isSelectedTabItem(type, user.id, user.assigned);
        return <UserSelectItem key={user.id} {...{ user, selected }}></UserSelectItem>;
      });
    },
    label: (type: string): JSX.Element[] => {
      const labelData = tabInfo[type] as Array<LabelType>;
      return labelData.map((label) => {
        const selected = isSelectedTabItem(type, label.id, label.checked);
        return <LabelSelectItem key={label.id} {...{ label, selected }} />;
      });
    },
    milestone: (type: string): JSX.Element[] => {
      const milestoneData = tabInfo[type] as Array<MilestoneType>;
      return milestoneData.map((milestone) => {
        const selected = isSelectedTabItem(type, milestone.id);
        return <MilestoneSelectItem key={milestone.id} {...{ milestone, selected }} />;
      });
    },
    author: (type: string): JSX.Element[] => {
      const authorData = tabInfo[type] as Array<UserType>;
      return authorData.map((author) => {
        //tabInfo에서 author key값이 없기 때문에 인자의 type은 assignee로 바꿔서 받고 isSelected판단할 때는 author을 사용
        const selected = isSelectedTabItem('author', author.id, author.assigned);
        return <AuthorSelectItem key={author.id} {...{ author, selected }}></AuthorSelectItem>;
      });
    },
  };

  const type = filterType === 'author' ? 'assignee' : filterType;
  const contentList = getContentList[filterType](type);
  return <ModalContentListBlock>{contentList}</ModalContentListBlock>;
}

const ModalContentListBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.color.white};
  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
`;
