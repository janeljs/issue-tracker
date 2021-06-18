interface APItype {
  getIssue: string;
  tabType: string;
  createIssue: string;
  login: (code: string) => string;
}
const basicURL = `http://3.37.76.224/api`;

const API: APItype = {
  getIssue: basicURL + `/issues?status=`,
  tabType: basicURL + `/issues/form`,
  createIssue: basicURL + `/issues/form`,
  login: (code: string) => basicURL + '/login?code=' + code,
};

export default API;
