import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function SocialLoginBtn(): ReactElement {
  return (
    <SocialLoginBtnBlock>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=619d8e37e985e7ab3be6&scope=user&redirect_uri=${process.env.REACT_APP_SERVER_URL}`}>
        <div>
          <GitHubIcon />
          &nbsp;GitHub 으로 로그인
        </div>
      </a>
    </SocialLoginBtnBlock>
  );
}

const SocialLoginBtnBlock = styled(Button)`
  margin-top: 30px;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  width: 350px;
  &:hover {
    a {
      color: ${({ theme }) => theme.color.fontGrey};
    }
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.white};
    div {
      display: flex;
      align-items: center;
    }
  }
`;
