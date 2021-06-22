import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import IssueTable from 'page/mainPage/issueTable/IssueTable';
import OptionTable from 'page/mainPage/optionTable/OptionTable';
import { fetchLogin } from 'util/api/fetchLogin';
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { controlLoginState } from 'store/loginStore';
import { getIssueTrigger } from 'store/issueInfoStore';
import { resetTabClickedState } from 'store/labelMilestoneStore';

export default function MainPage() {
  const resetTabClicked = useResetRecoilState(resetTabClickedState);
  resetTabClicked();
  const setLogin = useSetRecoilState(controlLoginState);
  const [issueTrigger, setIssueTrigger] = useRecoilState(getIssueTrigger);

  useEffect(() => {
    if (isLogin()) return;
    const query = window.location.search;
    const loginCode = query.split('=')[1];
    setLoginData(loginCode);
    setIssueTrigger(false);
  }, []);

  const setLoginData = async (loginCode: string) => {
    try {
      const loginData = await fetchLogin(loginCode);
      setLogin(loginData);
      localStorage.setItem('token', loginData.token);
    } catch (err) {
      throw err;
    }
  };

  const isLogin = () => !!localStorage.getItem('token');

  return (
    <MainPageBlock>
      <Suspense fallback='loading...'>
        <OptionTable />
      </Suspense>
      <Suspense fallback='loading...'>
        <IssueTable />
      </Suspense>
    </MainPageBlock>
  );
}

const MainPageBlock = styled.div`
  padding: 50px 80px;
`;
