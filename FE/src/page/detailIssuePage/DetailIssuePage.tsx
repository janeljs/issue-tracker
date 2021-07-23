import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  CommentType,
  LabelType,
  LoginUserType,
  MilestoneType,
  UserType,
} from 'components/common/tabModal/tapDataType';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { detailIdState, getDetailIssueData } from 'store/detailStore';
import { selectedTabState } from 'store/issueInfoStore';
import { controlLoginState } from 'store/loginStore';
import { ReactComponent as IssueDeleteBtn } from 'assets/icon/IssueDeleteBtn.svg';
import DetailIssueHeader from 'page/detailIssuePage/detailHeader/DetailIssueHeader';
import DetailIssueOption from 'page/detailIssuePage/detailIssueOption/DetailIssueOption';
import CommentList from './commentList/CommentList';
import { useHistory } from 'react-router-dom';
import ErrorPage from 'page/errorPage/ErrorPage';
import MyPortal from 'Portal';
import { fetchLogOut } from 'util/api/fetchLogin';
export interface DetailIssueType {
  id: number;
  title: string;
  status: boolean;
  createdDateTime: string;
  owner: LoginUserType;
  comments: Array<CommentType> | [];
  assignees: Array<UserType> | [];
  labels: Array<LabelType> | [];
  milestone: MilestoneType | null;
}

export default function DetailIssuePage() {
  const setDetailIssueId = useSetRecoilState(detailIdState);
  const setSelectdedOption = useSetRecoilState(selectedTabState);
  const pagePaths = window.location.pathname.split('/');
  const issueNum = +pagePaths[pagePaths.length - 1];
  useEffect(() => setDetailIssueId(issueNum), []);

  const issueData = useRecoilValue(getDetailIssueData);

  const resetLoginState = useResetRecoilState(controlLoginState);
  const history = useHistory();
  const [isError, setError] = useState(false);
  useEffect(() => setError(false), []);

  const logout = async () => {
    const logoutStatus = await fetchLogOut();
    if (logoutStatus) {
      console.log('?');
      localStorage.clear();
      resetLoginState();
      history.push('/');
    }
  };
  useEffect(() => {
    if (!issueData) return;
    const { assignees: assignee, labels: label, milestone } = issueData;
    const newSelectedOption = { assignee, label, milestone };
    setSelectdedOption(newSelectedOption);
  }, [issueData]);

  if (!issueData) {
    // logout();
    return null;
  }

  return isError ? (
    <MyPortal>
      <ErrorPage />
    </MyPortal>
  ) : (
    <DetailIssuePageBlock>
      <DetailIssueHeader issueData={issueData} />
      <div className='detail__main'>
        <CommentList issueId={issueData.id} comments={issueData.comments} />
        <div className='detail__option'>
          <DetailIssueOption id={issueData.id} />
          <div className='issue__delete-btn'>
            <IssueDeleteBtn />
          </div>
        </div>
      </div>
    </DetailIssuePageBlock>
  );
}

const DetailIssuePageBlock = styled.div`
  padding: 50px 80px;
  .detail__main {
    display: grid;
    grid-template-columns: 80% 20%;
    padding-top: 33px;
  }
  .issue__delete-btn {
    margin-top: 1rem;
    margin-right: 2rem;
    display: flex;
    justify-content: flex-end;
  }
`;
