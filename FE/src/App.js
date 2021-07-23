import { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
import LoginPage from 'page/loginPage/LoginPage';
import { useRecoilState } from 'recoil';
import { controlLoginState } from 'store/loginStore';
import { getUserInfoUsingJWT } from 'util/api/fetchLogin';
import LoadingProgress from 'components/atom/LoadingProgress';
import ErrorPage from 'page/errorPage/ErrorPage';
function App() {
  const MainPage = lazy(() => import('./page/mainPage/MainPage'));
  const CreateIssuePage = lazy(() => import('./page/createIssuePage/CreateIssuePage'));
  const DetailIssuePage = lazy(() => import('./page/detailIssuePage/DetailIssuePage'));
  const LabelPage = lazy(() => import('./page/labelPage/LabelPage'));
  const MilestonePage = lazy(() => import('./page/milestonePage/MilestonePage'));
  const [{ isLogin }, setLoginData] = useRecoilState(controlLoginState);

  useEffect(() => {
    //토큰이 잘못된경우 false를 리턴하고 처리해줬기 때문에 에러처리 삭제
    getUserData();
  }, [isLogin]);

  const getUserData = async () => {
    //맨 처음 로그인 경우 토큰 자체가 없기 때문에 jwt 토큰 체크 skip
    const token = localStorage.getItem('token');
    if (!token) return;

    const userData = await getUserInfoUsingJWT();
    const isLoginSuccess = userData ? true : false;

    if (!isLoginSuccess) {
      setLoginData({ isLogin: false, loginData: null });
      localStorage.clear();
      return;
    }

    const loginData = {
      avatarUrl: userData.avatarUrl,
      userName: userData.userName,
      name: userData.name,
    };
    setLoginData({ isLogin: true, loginData });
  };

  return (
    <div className='App'>
      <Router>
        <Header />
        <Suspense fallback={<LoadingProgress />}>
          <Switch>
            <Route path='/' exact={true}>
              {isLogin ? <Redirect to='/main' /> : <LoginPage />}
            </Route>
            <Route path='/main'>{isLogin ? <MainPage /> : <Redirect to='/' />}</Route>
            <Route path='/create'>{isLogin ? <CreateIssuePage /> : <Redirect to='/' />}</Route>
            <Route path='/detail'>{isLogin ? <DetailIssuePage /> : <Redirect to='/' />}</Route>
            <Route path='/label'>{isLogin ? <LabelPage /> : <Redirect to='/' />}</Route>
            <Route path='/milestone'>{isLogin ? <MilestonePage /> : <Redirect to='/' />}</Route>
            <Route>
              <ErrorPage />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
