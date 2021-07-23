import React, {
  ReactElement,
  ChangeEvent,
  useState,
  RefObject,
  SetStateAction,
  Dispatch,
} from 'react';
import styled from 'styled-components';
import { GiPaperClip } from 'react-icons/gi';
import { getFileURL } from 'util/api/fetchIssueDetail';
interface inputProps {
  titleRef: RefObject<HTMLInputElement>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
}
function IssueInput({ titleRef, comment, setComment }: inputProps): ReactElement {
  const [commentLength, setCommentLength] = useState(0);
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    setCommentLength(e.target.value.length);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    e.preventDefault();
    const uploadImage = e.target.files as FileList;
    const imageBlob = Object.values(uploadImage)[0];
    const imageName = imageBlob['name'];
    const formData = new FormData();
    formData.append('image', imageBlob, imageName);
    try {
      const fileURL = await getFileURL(formData);
      const markDownImg = `![${imageName}](${fileURL.image})`;
      setComment((comment) =>
        comment.length ? comment + '\n' + markDownImg : comment + markDownImg
      );
      setCommentLength(comment.length);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <IssueInputBlock>
      <input type='text' className='input__title' placeholder='제목' ref={titleRef} />
      <div className='input___comment'>
        <textarea
          className='input__description'
          placeholder='코멘트를 입력하세요.'
          onChange={handleCommentChange}
          value={comment}
        />
        <div className='input__addFile'>
          <form id='MD_IMG'>
            <label htmlFor='add_file'>
              <GiPaperClip />
              &nbsp;파일 첨부하기
            </label>
            <input
              type='file'
              id='add_file'
              className='input__file'
              accept='.png, .jpg, .jpeg'
              onChange={handleFileChange}
            />
          </form>
        </div>
        <div className='input__lengthCheck'>공백포함 {commentLength}자</div>
      </div>
    </IssueInputBlock>
  );
}
export default React.memo(IssueInput);
const IssueInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  .input__title,
  .input__description {
    border: none;
    background-color: ${({ theme }) => theme.color.inputBg};
    font-size: ${({ theme }) => theme.size.md}px;
    width: 100%;
    height: 56px;
    &:focus {
      text-decoration: none;
      background-color: ${({ theme }) => theme.color.white};
    }
  }
  .input__title {
    border-radius: 14px;
    padding: 0px 24px;
  }
  .input__description {
    border-radius: 14px 14px 0 0;
    padding: 24px;
    resize: none;
    width: -webkit-fill-availabel;
    height: 343px;

    &:focus {
      .input__addFile {
        background-color: ${({ theme }) => theme.color.white};
      }
    }
  }
  .input___comment {
    margin-top: 16px;
    border-radius: 14px;
    background-color: ${({ theme }) => theme.color.inputBg};
  }
  .input__addFile {
    padding: 16px 24px;
  }
  .input__file {
    height: 0px;
  }
  .input__lengthCheck {
    position: absolute;
    right: 21%;
    bottom: 20%;
  }
`;
