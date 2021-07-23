import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import { useRecoilValue } from 'recoil';
import {
  selectedTabState,
  selectedTabType,
  issueFilterSelectState,
  getTabInfoState,
} from 'store/issueInfoStore';
import { editIssueDetailOption } from 'util/api/fetchIssueDetail';
import OptionItem from 'page/detailIssuePage/detailIssueOption/OptionItem';
import TabModal from 'components/common/tabModal/TabModal';
interface Props {
  id: number;
}

export default function DetailIssueOption({ id }: Props) {
  const [selectedOption, setSelectedOption] = useState<selectedTabType>(EMPTY_OPTIONS);
  const optionData = useRecoilValue(getTabInfoState);
  const selectedOptionData = useRecoilValue<selectedTabType>(selectedTabState);
  const selectedOptionType = useRecoilValue(issueFilterSelectState);

  const assigneeToggle = useRef<HTMLDivElement>(null);
  const labelToggle = useRef<HTMLDivElement>(null);
  const milestoneToggle = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const TAB_OPTIONS = [
    { key: 'assignee', name: '담당자', ref: assigneeToggle },
    { key: 'label', name: '레이블', ref: labelToggle },
    { key: 'milestone', name: '마일스톤', ref: milestoneToggle },
  ];

  const { open } = useToggle({
    toggle: [assigneeToggle, labelToggle, milestoneToggle],
    modal: modalRef,
  });

  useEffect(() => {
    if (open) return;
    setSelectedOption(selectedOptionData);
    const newSelectedOptionData = getSelectOptionData(selectedOptionType);

    editIssueDetailOption(id, selectedOptionType, newSelectedOptionData);
  }, [open, selectedOptionData]);

  const getSelectOptionData = (type: string) => {
    if (type === 'assignee') {
      const selectedId = selectedOptionData[type].map((v) => v.id);
      const newOptionData = optionData[type]
        .map((data) => {
          if (selectedId.includes(data.id)) return { ...data, assigned: true };
          return data;
        })
        .map((data) => ({ id: data.id, isAssigned: data.assigned }));

      return newOptionData;
    }

    if (type === 'label') {
      const selectedId = selectedOptionData[type].map((v) => v.id);
      const newOptionData = optionData[type]
        .map((data) => {
          if (selectedId.includes(data.id)) return { ...data, checked: true };
          return data;
        })
        .map((data) => ({ id: data.id, isChecked: data.checked }));

      return newOptionData;
    }
    if (type === 'milestone') {
      const selectedId = selectedOptionData[type]?.id;
      const newOptionData = optionData[type].find((data) => data.id === selectedId);
      if (!newOptionData || !selectedId) return { id: null };
      return { id: newOptionData.id };
    }
    return null;
  };

  //(담당자 + ,라벨 + )같은 OPTION ITEM
  const issueOptionList = TAB_OPTIONS.map(({ key, name, ref }) => (
    <OptionItem
      key={key}
      optionKey={key}
      optionName={name}
      optionRef={ref}
      selectedOption={selectedOption}
    />
  ));

  return (
    <DetailIssueOptionWrapper>
      <DetailIssueOptionBlock>{issueOptionList}</DetailIssueOptionBlock>
      {open && <TabModal modalRef={modalRef} className='detail-option__modal' />}
    </DetailIssueOptionWrapper>
  );
}

const EMPTY_OPTIONS = {
  assignee: [],
  label: [],
  milestone: null,
};

const DetailIssueOptionWrapper = styled.div`
  position: relative;
  .detail-option__modal {
    top: 0;
    left: -300px;
  }
`;

const DetailIssueOptionBlock = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  over-flow: hidden;
  height: min-content;
  & > div {
    padding: 34px 32px;
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    &:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.color.lineGrey};
    }
  }
`;
