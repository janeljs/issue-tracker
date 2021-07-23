import { atom, selector } from 'recoil';

//로그인 여부
export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

interface loginStateType {
  avatarUrl: string;
  name: string;
  userName: string;
}

//로그인 사용자 및 토큰 정보
export const loginDataState = atom<loginStateType | null>({
  key: 'loginDataState',
  default: null,
});

interface LoginControllType {
  isLogin: boolean;
  loginData: loginStateType | null;
}

//로그인 여부 및 정보 셀렉터
export const controlLoginState = selector<LoginControllType>({
  key: 'controlLoginState',
  get: ({ get }) => {
    const isLogin = get(isLoginState);
    const loginData = get(loginDataState);
    return { isLogin, loginData };
  },
  set: ({ set }, newLoginData) => {
    const { isLogin, loginData } = newLoginData as LoginControllType;
    set(loginDataState, loginData);
    set(isLoginState, isLogin);
  },
});
