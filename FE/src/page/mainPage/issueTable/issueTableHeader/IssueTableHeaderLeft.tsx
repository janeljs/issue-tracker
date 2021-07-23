import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CheckBox from 'components/atom/CheckBox';
import AdjustRoundedIcon from '@material-ui/icons/AdjustRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { getIssuesInfoState, issueTypeState, IssuesInfoStateType } from 'store/issueInfoStore';
import { controlLoginState } from 'store/loginStore';
import { useHistory } from 'react-router-dom';
import ErrorPage from 'page/errorPage/ErrorPage';
import MyPortal from 'Portal';
import { fetchLogOut } from 'util/api/fetchLogin';
export default function IssueListHeaderLeft() {
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

  const setIssueType = useSetRecoilState(issueTypeState);
  const issuesInfoData = useRecoilValue(getIssuesInfoState);
  if (typeof issuesInfoData === 'number') {
    if (issuesInfoData === 400) logout();
    else setError(true);
  }
  let countInfo = issuesInfoData as IssuesInfoStateType;
  let openIssueCount = countInfo.count.openedIssue;
  let closeIssueCount = countInfo.count.closedIssue;
  const handleOpenClick = () => setIssueType('open');
  const handleCloseClick = () => setIssueType('close');
  return isError ? (
    <MyPortal>
      <ErrorPage />
    </MyPortal>
  ) : (
    <IssueListHeaderLeftBlock>
      <CheckBox />
      <div className='issue-header__filter-tab'>
        <div onClick={handleOpenClick}>
          <AdjustRoundedIcon /> <span>열린 이슈 ({openIssueCount})</span>
        </div>
        <div onClick={handleCloseClick}>
          <CheckRoundedIcon /> <span>닫힌 이슈 ({closeIssueCount})</span>
        </div>
      </div>
    </IssueListHeaderLeftBlock>
  );
}

const IssueListHeaderLeftBlock = styled.div`
  display: flex;
  .issue-header__filter-tab {
    display: flex;
    div {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
    }
  }
`;
