import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { DetailHeaderProps } from 'page/detailIssuePage/detailType';
import { titleEditMode, detailIssueTrigger } from 'store/detailStore';
import fetchEditTitle from 'util/api/fetchEditTitle';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';

export default function HeaderEditMode({ issueNumber, title }: DetailHeaderProps) {
  const setDetailRender = useSetRecoilState(detailIssueTrigger);
  const setTitleEditMode = useSetRecoilState(titleEditMode);
  const [editTitle, setEditTitle] = useState(title);
  const handleCancel = () => setTitleEditMode(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.target.value);
  const handleSubmit = async () => {
    const fetchResult = await fetchEditTitle(issueNumber, editTitle);
    if (fetchResult) {
      setTitleEditMode(false);
      setDetailRender((trigger) => trigger + 1);
    }
  };

  return (
    <HeaderEditBlock>
      <div className='header__input__title'>
        <input className='issue__input__title' value={editTitle} onChange={handleChange} />
      </div>
      <div className='header__edit__btn'>
        <PrimaryOutlinedButton value='× 편집 취소' onClick={handleCancel} />
        <PrimaryOutlinedButton value='편집 완료' onClick={handleSubmit} />
      </div>
    </HeaderEditBlock>
  );
}

const HeaderEditBlock = styled.div`
  display: flex;
  justify-content: space-between;
  .issue__input__title {
    min-width: 709px;
    font-size: ${({ theme }) => theme.size.lg}px;
    height: 46px;
    border: none;
    border-radius: 11px;
    background-color: ${({ theme }) => theme.color.inputBg};
    margin-bottom: 1rem;
    &:focus {
      text-decoration: none;
      background-color: ${({ theme }) => theme.color.white};
    }
  }
`;
