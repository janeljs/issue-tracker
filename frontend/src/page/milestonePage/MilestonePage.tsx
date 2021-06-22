import { useState } from 'react';
import LabelMilestoneTab from 'components/common/LabelMilestoneTab';
import PrimaryButton from 'components/atom/PrimaryButton';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import MilestoneAdd from 'page/milestonePage/MilestoneAdd';
import styled from 'styled-components';
import { labelMilestoneClickedState } from 'store/labelMilestoneStore';
import { useSetRecoilState } from 'recoil';
import MilestoneIcon from 'components/atom/MilestoneIcon';
import MilestoneItem from 'page/milestonePage/MilestoneItem';
import { ReactComponent as CloseIcon } from 'assets/icon/CloseIcon.svg';
export default function MilestonePage() {
  const setLabelMilestoneState = useSetRecoilState(labelMilestoneClickedState);
  setLabelMilestoneState({ label: false, milestone: true });

  const [addClick, setAddClick] = useState(false);
  const handleClick = () => {
    setAddClick(!addClick);
  };
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
      {addClick && <MilestoneAdd />}
      <div className='tab__table'>
        <div className='tab__table__header'>
          <div>
            <div>
              <MilestoneIcon />
              열린 마일스톤(2)
            </div>
            <div>
              <CloseIcon />
              &nbsp;&nbsp;닫힌 마일스톤(2)
            </div>
          </div>
        </div>
        <MilestoneItem />
      </div>
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
  .tab__table {
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
  .tab__table__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.bgGrey};
    border-radius: 16px 16px 0 0;
    div {
      display: flex;
      width: 300px;
      div {
        display: flex;
        align-items: center;
      }
    }
  }
`;
