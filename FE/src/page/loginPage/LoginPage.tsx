import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginLogo from 'page/loginPage/loginLogo/LoginLogo';
import SocialLoginBtn from 'page/loginPage/socialLoginBtn/SocialLoginBtn';
import LoginForm from 'page/loginPage/loginForm/LoginForm';
import Copyright from 'components/common/Copyright';
import { useSetRecoilState } from 'recoil';
import { controlLoginState } from 'store/loginStore';
import { fetchLogin } from 'util/api/fetchLogin';
import { useHistory } from 'react-router-dom';
export default function LoginPage() {
  const history = useHistory();
  const setLoginData = useSetRecoilState(controlLoginState);

  const query = window.location.search;
  useEffect(() => {
    if (!query) return;
    const loginCode = query.split('=')[1];
    getLoginUserData(loginCode);
  }, [query]);

  const getLoginUserData = async (loginCode: string) => {
    try {
      const { avatarUrl, name, userName, token } = await fetchLogin(loginCode);
      const loginUserData = { avatarUrl, name, userName };
      setLoginData({ isLogin: true, loginData: loginUserData });
      localStorage.setItem('token', token);
      history.push('/main');
    } catch (err) {
      throw err;
    }
  };

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
