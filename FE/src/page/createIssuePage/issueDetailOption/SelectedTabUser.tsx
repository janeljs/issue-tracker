import React from 'react';
import styled from 'styled-components';
import { UserType } from 'components/common/tabModal/tapDataType';
import ProfileImg from 'components/atom/ProfileImg';

interface Props {
  user: UserType;
}

export default function SelectedTabUser({ user }: Props) {
  return (
    <SelectedTabUserBlock>
      <ProfileImg avatarURL={user.image} className='profile__img' />
      <div className='selected__user-name'>{user.userName}</div>
    </SelectedTabUserBlock>
  );
}

const SelectedTabUserBlock = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  .profile__img {
    width: 44px;
    height: 44px;
  }
  .selected__user-name {
    margin-left: 4px;
  }
`;
