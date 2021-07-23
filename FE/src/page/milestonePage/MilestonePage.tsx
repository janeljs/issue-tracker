import { useState } from 'react';
import styled from 'styled-components';
import { labelMilestoneClickedState } from 'store/labelMilestoneTabStore';
import { useSetRecoilState } from 'recoil';
import LabelMilestoneTab from 'components/common/LabelMilestoneTab';
import PrimaryButton from 'components/atom/PrimaryButton';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import MilestoneEditForm from 'page/milestonePage/MilestoneEditForm';
import MilestoneTable from 'page/milestonePage/milestoneTable/MilestoneTable';
export default function MilestonePage() {
  const setLabelMilestoneState = useSetRecoilState(labelMilestoneClickedState);
  setLabelMilestoneState({ label: false, milestone: true });

  const [addClick, setAddClick] = useState(false);
  const handleClick = () => setAddClick(!addClick);

  return (
    <MilestoneBlock>
      <div className='tab__option__header'>
        <LabelMilestoneTab />
        {!addClick ? (
          <PrimaryButton value={'+ 추가'} onClick={handleClick} />
        ) : (
          <PrimaryOutlinedButton value={'× 닫기'} onClick={handleClick} />
        )}
      </div>
      {addClick && <MilestoneEditForm setEditMode={setAddClick} />}
      <MilestoneTable />
    </MilestoneBlock>
  );
}

const MilestoneBlock = styled.div`
  padding: 50px 80px;
  .tab__option__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
  }
`;
