import React from 'react';
import styled from 'styled-components';
import LoginLogo from 'page/loginPage/loginLogo/LoginLogo';
import SocialLoginBtn from 'page/loginPage/socialLoginBtn/SocialLoginBtn';
import LoginForm from 'page/loginPage/loginForm/LoginForm';
import Copyright from 'components/common/Copyright';


export default function LoginPage() {
  return (
    <LoginPageBlock>
      <div className='social-login'>
        <LoginLogo />
        <SocialLoginBtn />
      </div>
      <div className='login-form'>
        <LoginForm />
      </div>
      <Copyright />
    </LoginPageBlock>
  );
}

const LoginPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .social-login {
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .login-form {
    width: 400px;
    margin: 40px 0;
  }
`;
