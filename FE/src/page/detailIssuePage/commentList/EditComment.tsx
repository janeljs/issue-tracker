import React, { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { detailIssueTrigger } from 'store/detailStore';
import { editComments } from 'util/api/fetchIssueDetail';
import { GiPaperClip } from 'react-icons/gi';
import PrimaryButton from 'components/atom/PrimaryButton';

interface Props {
  issueId: number;
  commentId: number;
  comment: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export default function EditComment({ issueId, commentId, comment, setIsEdit }: Props) {
  const setDetailIssueTrigger = useSetRecoilState(detailIssueTrigger);
  const [editComment, setEditComment] = useState(comment);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setEditComment(e.target.value);
  const handelCancelClick = () => setIsEdit(false);
  const handleSubmitClick = async () => {
    if (editComment === comment) {
      setIsEdit(false);
      return;
    }

    //POST보낸 후에 요청이 성공했으면 trigger 실행
    const editCommentResult = await editComments(issueId, editComment, commentId);
    if (editCommentResult) {
      setDetailIssueTrigger((triggerCount) => triggerCount + 1);
      setIsEdit(false);
    }
  };

  return (
    <EditCommentBlock>
      <div className='comment__input'>
        <textarea
          className='input__description'
          placeholder='코멘트를 입력하세요.'
          onChange={handleCommentChange}
          value={editComment}
        />
        <div className='input__addFile'>
          <label htmlFor='add_file'>
            <GiPaperClip />
            &nbsp;파일 첨부하기
          </label>
          <input type='file' id='add_file' className='input__file' accept='.png, .jpg, .jpeg' />
        </div>
        <div className='input__lengthCheck'>공백포함 {editComment.length}자</div>
      </div>
      <div className='comment__edit-btn'>
        <PrimaryButton onClick={handelCancelClick} value='편집 취소' className='form__cancel-btn' />
        <PrimaryButton onClick={handleSubmitClick} value='편집 완료' className='form__submit-btn' />
      </div>
    </EditCommentBlock>
  );
}

const EditCommentBlock = styled.div`
  width: 100%;
  .comment__input {
    position: relative;
    width: 100%;
    background-color: ${({ theme }) => theme.color.inputBg};
    border-radius: 14px;
    margin-bottom: 1rem;
  }
  .input__description {
    padding: 24px;
    width: 100%;
    height: 343px;
    font-size: ${({ theme }) => theme.size.md}px;
    background-color: ${({ theme }) => theme.color.inputBg};
    border: none;
    border-bottom: 1px dashed ${({ theme }) => theme.color.fontGrey};
    border-radius: 14px 14px 0 0;
    resize: none;

    &:focus {
      text-decoration: none;
      background-color: ${({ theme }) => theme.color.white};
      .input__addFile {
        background-color: ${({ theme }) => theme.color.white}; //?이거 어케해야함?
      }
    }
  }
  .input__addFile {
    padding: 16px 24px;
  }
  .input__file {
    height: 0px;
  }
  .input__lengthCheck {
    position: absolute;
    right: 3%;
    bottom: 20%;
  }
  .comment__edit-btn {
    display: flex;
    justify-content: flex-end;

    .form__cancel-btn {
      width: 120px;
      background-color: ${({ theme }) => theme.color.blueGrey};
    }
    .form__submit-btn {
      width: 120px;
      background-color: ${({ theme }) => theme.color.skyblue};
    }
  }
`;
