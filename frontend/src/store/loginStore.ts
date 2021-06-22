import { atom, selector } from 'recoil';

//로그인이 됐냐 안됐냐
export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

interface loginStateType {
  avatarUrl: string;
  userName: string;
  token: string;
}

//로그인 정보
export const loginDataState = atom<loginStateType | null>({
  key: 'loginDataState',
  default: null,
});

/*
로그인: loginState - 로그인정보
로그아웃: loginState - null
*/
export const controlLoginState = selector<loginStateType | null>({
  key: 'controlLoginState',
  get: ({ get }) => {
    const loginData = get(loginDataState);
    return loginData;
  },
  set: ({ set }, loginData) => {
    set(loginDataState, loginData);
    if (loginData) {
      set(isLoginState, true);
    } else set(isLoginState, false);
  },
});
