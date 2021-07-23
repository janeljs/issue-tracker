import React, { ReactElement, RefObject } from 'react';
import styled from 'styled-components';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useSetRecoilState } from 'recoil';
import {
  issueFilterTypeState,
  selectedTabType,
  issueFilterSelectState,
} from 'store/issueInfoStore';
import SelectedTabUser from 'page/createIssuePage/issueDetailOption/SelectedTabUser';
import SelectedTabLabel from 'page/createIssuePage/issueDetailOption/SelectedTabLabel';
import SelectedTabMilestone from 'page/createIssuePage/issueDetailOption/SelectedTabMilestone';

interface Props {
  optionName: string;
  optionKey: string;
  optionRef: RefObject<HTMLDivElement>;
  selectedOption: selectedTabType;
}

export default function OptionItem({ optionName, optionKey, optionRef, selectedOption }: Props) {
  const setOptionType = useSetRecoilState(issueFilterTypeState);
  const setSelectedOptionType = useSetRecoilState(issueFilterSelectState);

  const {
    assignee: selectedAssignee,
    label: selectedLabel,
    milestone: selectedMilestone,
  } = selectedOption;

  const handleOptionClick = () => {
    const optionType = { key: optionKey, name: optionName };
    setOptionType(optionType);
    setSelectedOptionType(optionKey);
  };

  const optionSelectedList: { [key: string]: ReactElement | Array<ReactElement> | null } = {
    assignee: selectedAssignee?.map((user) => <SelectedTabUser key={user.id} user={user} />),
    label: selectedLabel?.map((label) => <SelectedTabLabel key={label.id} label={label} />),
    milestone: selectedMilestone ? (
      <SelectedTabMilestone key={selectedMilestone.id} milestone={selectedMilestone} />
    ) : null,
  };

  const selectedOptionClassName = `selected-option__${optionKey}`;

  return (
    <OptionItemBlock ref={optionRef} onClick={handleOptionClick}>
      <div>
        <span>{optionName}</span>
        <AddOutlinedIcon />
      </div>
      <div className={selectedOptionClassName}>{optionSelectedList[optionKey]}</div>
    </OptionItemBlock>
  );
}

const OptionItemBlock = styled.div`
  .selected__assignee {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .selected-option__label {
    display: flex;
  }
`;
