import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { titleEditMode, detailIssueTrigger } from 'store/detailStore';
import Title from 'components/atom/Title';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import { DetailHeaderProps } from 'page/detailIssuePage/detailType';
import { fetchIssueClose, fetchIssueOpen } from 'util/api/fetchCreateIssue';

export default function HeaderViewMode({ issueNumber, status, title }: DetailHeaderProps) {
  const setTitleEditMode = useSetRecoilState(titleEditMode);
  const setIssueOpenClose = useSetRecoilState(detailIssueTrigger); //이슈를 여닫으면서 상세페이지 데이터를 새로 요청함->이슈상태를 바꿔줄 필요x.
  const issueStateValue = status ? '이슈닫기' : '이슈열기';
  const handleEditClick = () => setTitleEditMode(true);
  const handleOpenClose = async () => {
    const response = status
      ? await fetchIssueClose(issueNumber)
      : await fetchIssueOpen(issueNumber);
    if (response === 200) setIssueOpenClose((trigger) => trigger + 1);
  };
  return (
    <HeaderViewBlock>
      <div className='header__title'>
        <Title className='issue__title'>{title}</Title>
        <Title className='issue__number'>{'#' + issueNumber}</Title>
      </div>
      <div className='header__edit__btn'>
        <PrimaryOutlinedButton value='제목편집' onClick={handleEditClick} />
        <PrimaryOutlinedButton value={issueStateValue} onClick={handleOpenClose} />
      </div>
    </HeaderViewBlock>
  );
}

const HeaderViewBlock = styled.div`
  display: flex;
  justify-content: space-between;
  .header__title {
    font-size: 2rem;
    display: flex;
    margin-bottom: 1rem;
    .issue__number {
      color: ${({ theme }) => theme.color.fontGrey};
      margin-left: 1rem;
    }
  }
`;
