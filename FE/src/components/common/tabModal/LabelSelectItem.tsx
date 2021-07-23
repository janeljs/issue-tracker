import React from 'react';
import styled from 'styled-components';
import { hoverGrey } from 'style/Theme';
import { useSetRecoilState } from 'recoil';
import { LabelType } from 'components/common/tabModal/tapDataType';
import { ReactComponent as RadioButton } from 'assets/icon/RadioButton.svg';
import { selectedLabelState, getIssueTrigger, searchWordState } from 'store/issueInfoStore';

interface LabelSelectItemProps {
  label: LabelType;
  selected: boolean;
}

export default function LabelSelectItem({
  label: { id, name, color },
  label,
  selected,
}: LabelSelectItemProps) {
  const setSelectLabel = useSetRecoilState(selectedLabelState);
  const setIssueListTrigger = useSetRecoilState(getIssueTrigger);
  const setSearchWord = useSetRecoilState(searchWordState);

  const handeClick = () => {
    if (selected) {
      setSelectLabel((selectedLabel) => selectedLabel.filter((item) => item.id !== id));
    } else {
      setSelectLabel((selectedLabel) => [...selectedLabel, label]);
    }
    setSearchWord('');
    setIssueListTrigger((triggerCount) => triggerCount + 1);
  };

  return (
    <LabelSelectItemBlock colorCode={color} onClick={handeClick}>
      <div className='label'>
        <div className='label__label'></div>
        <div className='label__title'>{name}</div>
      </div>
      {selected && <RadioButton />}
    </LabelSelectItemBlock>
  );
}

interface StyledProps {
  colorCode: {
    backgroundColorCode: string;
    textColorCode: string;
  };
}

const LabelSelectItemBlock = styled(hoverGrey)<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  cursor: pointer;
  .label {
    display: flex;
    align-items: center;
  }
  .label__label {
    width: 20px;
    height: 20px;
    border: 1px solid #d9dbe9;
    background-color: ${({ colorCode }) => colorCode.backgroundColorCode};
    border-radius: 100%;
    margin-right: 8px;
  }
`;
