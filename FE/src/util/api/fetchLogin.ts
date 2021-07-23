import API, { authorizedHeaders } from 'util/api/api';
export async function fetchLogin(code: string): Promise<any> {
  try {
    const postLoginOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(API.SIGN.LOGIN(code), postLoginOption);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserInfoUsingJWT() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.SIGN.USER, { headers: authorizedHeaders(token) });
    const userData = await response.json();
    return userData;
  } catch (err) {
    return null;
  }
}

export async function fetchLogOut() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(API.SIGN.LOGOUT, {
      headers: authorizedHeaders(token),
    });
    if (response.status === 200) return true;
    else throw Error;
  } catch (err) {
    console.log('로그아웃에러', err);
    return err;
  }
}
