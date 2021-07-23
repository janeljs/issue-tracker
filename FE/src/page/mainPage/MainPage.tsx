import { Suspense } from 'react';
import styled from 'styled-components';
import { useResetRecoilState } from 'recoil';
import { resetTabClickedState } from 'store/labelMilestoneTabStore';
import IssueTable from 'page/mainPage/issueTable/IssueTable';
import OptionTable from 'page/mainPage/optionTable/OptionTable';
import LoadingProgress from 'components/atom/LoadingProgress';

export default function MainPage() {
  const resetTabClicked = useResetRecoilState(resetTabClickedState);
  resetTabClicked();
  return (
    <MainPageBlock>
      <Suspense fallback={<LoadingProgress />}>
        <OptionTable />
      </Suspense>
      <Suspense fallback={<LoadingProgress />}>
        <IssueTable />
      </Suspense>
    </MainPageBlock>
  );
}

const MainPageBlock = styled.div`
  padding: 50px 80px;
`;
