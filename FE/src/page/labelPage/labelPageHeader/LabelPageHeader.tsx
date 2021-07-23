import { Dispatch, SetStateAction } from 'react';
import LabelMilestoneTab from 'components/common/LabelMilestoneTab';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import PrimaryButton from 'components/atom/PrimaryButton';
import styled from 'styled-components';

interface Props {
  isCreateLabel: boolean;
  setIsCreateLabel: Dispatch<SetStateAction<boolean>>;
}

export default function LabelPageHeader({ isCreateLabel, setIsCreateLabel }: Props) {
  const handleClick = () => setIsCreateLabel((isCreateLabel) => !isCreateLabel);

  return (
    <LabelPageHeaderBlock>
      <LabelMilestoneTab />
      {!isCreateLabel ? (
        <PrimaryButton value={'+ 추가'} onClick={handleClick} />
      ) : (
        <PrimaryOutlinedButton value={'× 닫기'} onClick={handleClick} />
      )}
    </LabelPageHeaderBlock>
  );
}

const LabelPageHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;
