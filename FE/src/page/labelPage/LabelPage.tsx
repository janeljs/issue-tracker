import { useState, Suspense } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { labelMilestoneClickedState } from 'store/labelMilestoneTabStore';
import LabelPageHeader from 'page/labelPage/labelPageHeader/LabelPageHeader';
import LabelTable from 'page/labelPage/labelTable/LabelTable';
import LabelEditForm from 'page/labelPage/labelEditForm/LabelEditForm';
import LoadingProgress from 'components/atom/LoadingProgress';
export default function LabelPage() {
  const [isCreateLabel, setIsCreateLabel] = useState(false);
  const setLabelMilestoneState = useSetRecoilState(labelMilestoneClickedState);
  setLabelMilestoneState({ label: true, milestone: false });

  const handleCreateClick = () => setIsCreateLabel(true);
  const handelCancelClick = () => setIsCreateLabel(false);

  return (
    <LabelBlock>
      <LabelPageHeader {...{ handleCreateClick, isCreateLabel, setIsCreateLabel }} />
      {isCreateLabel && (
        <LabelEditForm title='새로운 레이블 추가' handelCancelClick={handelCancelClick} />
      )}
      <Suspense fallback={<LoadingProgress />}>
        <LabelTable />
      </Suspense>
    </LabelBlock>
  );
}

const LabelBlock = styled.div`
  padding: 50px 80px;
`;
