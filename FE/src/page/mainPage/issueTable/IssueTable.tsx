import { useEffect, Suspense, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { getIssuesInfoState, IssuesInfoStateType } from 'store/issueInfoStore';
import { controlLoginState } from 'store/loginStore';
import IssueListHeader from 'page/mainPage/issueTable/issueTableHeader/IssueTableHeader';
import IssueItem from 'page/mainPage/issueTable/IssueItem';
import Pagination from 'components/atom/Pagination';
import LoadingProgress from 'components/atom/LoadingProgress';
import { useHistory } from 'react-router-dom';
import ErrorPage from 'page/errorPage/ErrorPage';
import MyPortal from 'Portal';
import { fetchLogOut } from 'util/api/fetchLogin';
export default function IssueTable() {
  const history = useHistory();
  const resetLoginState = useResetRecoilState(controlLoginState);
  const [isError, setError] = useState(false);
  useEffect(() => setError(false), []);
  const logout = async () => {
    const logoutStatus = await fetchLogOut();
    if (logoutStatus) {
      localStorage.clear();
      resetLoginState();
      history.push('/');
    }
  };

  const issueDataStatus = useRecoilValue(getIssuesInfoState); //?구조분해타입어케~
  let issueList, totalPages;
  if (typeof issueDataStatus === 'number') {
    if (issueDataStatus === 400) logout();
    else setError(true);
  }
  let issuesInfoData = issueDataStatus as IssuesInfoStateType;
  issueList = issuesInfoData.issues.map((issue) => <IssueItem key={issue.id} issue={issue} />);
  totalPages = issuesInfoData.totalPages;

  return isError ? (
    <MyPortal>
      <ErrorPage />
    </MyPortal>
  ) : (
    <IssueTableBlock>
      <div className='issue-table'>
        <IssueListHeader />
        <Suspense fallback={<LoadingProgress />}>{issueList}</Suspense>
      </div>
      <div className='pagenation'>
        <Pagination totalPages={totalPages} />
      </div>
    </IssueTableBlock>
  );
}

const IssueTableBlock = styled.div`
  .issue-table {
    min-width: 680px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
  .pagenation {
    display: flex;
    justify-content: center;
  }
`;
