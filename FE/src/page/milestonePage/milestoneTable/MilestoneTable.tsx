import React, { Suspense } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getMilestones, MilestoneStatus, milestoneTrigger } from 'store/milestoneStore';
import MilestoneIcon from 'components/atom/MilestoneIcon';
import { ReactComponent as CloseIcon } from 'assets/icon/CloseIcon.svg';
import MilestoneItem from 'page/milestonePage/milestoneTable/MilestoneItem';
import { MilestoneType } from 'components/common/tabModal/tapDataType';
import LoadingProgress from 'components/atom/LoadingProgress';
function MilestoneTable() {
  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);
  const setMilestoneStatus = useSetRecoilState(MilestoneStatus);
  const { closedMilestonesCount, openedMilestonesCount, milestones } =
    useRecoilValue(getMilestones);
  const milestoneList = milestones.map((milestone: MilestoneType) => (
    <MilestoneItem key={milestone.id} milestone={milestone} />
  ));
  const handleClick = (n: number) => {
    setMilestoneStatus(Boolean(n));
    setMilestoneTrigger((trigger) => trigger + 1);
  };
  return (
    <MilestoneTableBlock>
      <div className='tab__table__header'>
        <div>
          <MilestonTab onClick={() => handleClick(1)}>
            <MilestoneIcon />
            열린 마일스톤({openedMilestonesCount})
          </MilestonTab>
          <MilestonTab onClick={() => handleClick(0)}>
            <CloseIcon />
            &nbsp;&nbsp;닫힌 마일스톤({closedMilestonesCount})
          </MilestonTab>
        </div>
      </div>
      <Suspense fallback={<LoadingProgress />}>{milestoneList}</Suspense>
    </MilestoneTableBlock>
  );
}
export default React.memo(MilestoneTable);

const MilestoneTableBlock = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
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
    }
  }
`;

const MilestonTab = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
