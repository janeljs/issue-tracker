import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CommentType } from 'components/common/tabModal/tapDataType';
import { timeChecker } from 'util/timeUtil';
import { ReactComponent as EditBtn } from 'assets/icon/EditIcons.svg';
import { ReactComponent as Emoji } from 'assets/icon/Emoji.svg';
import ProfileImg from 'components/atom/ProfileImg';
import EditComment from './EditComment';
import ImgParser from 'util/ImgParser';
interface Props {
  issueId: number;
  comment: CommentType;
}

export default function Comment({
  issueId,
  comment: { id, avatarUrl, userName, comment, createdDateTime, author, owner },
}: Props) {
  let imageLink;
  let imageDescription;
  let stringComment;
  const passedTime = timeChecker(createdDateTime);
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => setIsEdit(true);

  let imageData = ImgParser(comment);
  if (imageData) {
    imageLink = imageData?.imgLink;
    imageDescription = imageData?.imgDescription;
    comment = imageData?.comment;
  }

  return (
    <CommentBlock>
      <div className='comment__avatar'>
        <ProfileImg className='comment__avatar-img' avatarURL={avatarUrl} />
      </div>
      {isEdit ? (
        <EditComment {...{ issueId, comment, setIsEdit }} commentId={id} />
      ) : (
        <div className='comment'>
          <div className='comment__header'>
            <div className='header__section'>
              <div>{userName}</div>
              <div className='comment__passed-time'>{passedTime}</div>
            </div>
            <div className='header__section'>
              {owner && <div className='comment__author-label'>작성자</div>}
              {author && (
                <div className='comment__edit-btn' onClick={handleEditClick}>
                  <EditBtn />
                  <div>편집</div>
                </div>
              )}
              <Emoji />
            </div>
          </div>
          <div className='comment__content'>
            <div>{comment}</div>
            {ImageData && (
              <div>
                <img src={imageLink} alt={imageDescription} width='500' height='auto' />
              </div>
            )}
          </div>
        </div>
      )}
    </CommentBlock>
  );
}

const CommentBlock = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  .comment__avatar {
    margin-right: 1rem;
    .comment__avatar-img {
      margin-top: 0.7rem;
      width: 44px;
      height: 44px;
    }
  }
  .comment {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: 1px solid #d9dbe9;
    border-radius: 16px;
    overflow: hidden;
  }
  .comment__header,
  .comment__content {
    padding: 0.5rem 1.5rem;
    flex: 1;
    display: flex;
  }
  .comment__header {
    justify-content: space-between;
    align-items: center;
    background-color: ${({ theme }) => theme.color.bgGrey};
  }
  .comment__content {
    flex-direction: column;
  }
  .header__section,
  .comment__edit-btn {
    display: flex;
    align-items: center;
  }
  .header__section:first-child {
    .comment__passed-time {
      margin-left: 8px;
      color: ${({ theme }) => theme.color.fontGrey};
    }
  }
  .header__section:last-child {
    & > div,
    & > svg {
      cursor: pointer;
    }
    & > div {
      margin-right: 1rem;
    }
    .comment__author-label {
      border: ${({ theme }) => `1px solid ${theme.color.lineGrey}`};
      border-radius: 30px;
      padding: 2px 16px;
    }
  }
`;
