import React from 'react';
import styled from 'styled-components';
import { hoverGrey } from 'style/Theme';
import { useSetRecoilState } from 'recoil';
import ProfileImg from 'components/atom/ProfileImg';
import { UserType } from 'components/common/tabModal/tapDataType';
import { ReactComponent as RadioButton } from 'assets/icon/RadioButton.svg';
import { selectedAuthorState, getIssueTrigger, searchWordState } from 'store/issueInfoStore';

interface AuthorProps {
  author: UserType;
  selected: boolean;
}

export default function AuthorSelectItem({
  author: { id, image, userName },
  author,
  selected,
}: AuthorProps) {
  const setSelectAuthor = useSetRecoilState(selectedAuthorState);
  const setIssueListTrigger = useSetRecoilState(getIssueTrigger);
  const setSearchWord = useSetRecoilState(searchWordState);

  const handeClick = () => {
    if (selected) {
      setSelectAuthor(null);
    } else {
      setSelectAuthor(author);
    }
    setSearchWord('');
    setIssueListTrigger((triggerCount) => triggerCount + 1);
  };

  return (
    <AuthorSelectItemBlock onClick={handeClick}>
      <div className='author-select__info'>
        <div className='author-select__image'>
          <ProfileImg avatarURL={image} isSmall={true} />
        </div>
        <div className='author-select__name'>{userName}</div>
      </div>
      {selected && <RadioButton />}
    </AuthorSelectItemBlock>
  );
}

const AuthorSelectItemBlock = styled(hoverGrey)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  .author-select__info {
    display: flex;
  }
  div {
    display: flex;
  }
  .author-select__image {
    margin-right: 8px;
  }
  .author-select__name {
    color: ${({ theme }) => theme.color.fontBlack};
  }
`;
