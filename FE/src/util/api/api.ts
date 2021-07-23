import APItype from 'util/api/apiType';

const basicURL = process.env.REACT_APP_DB_BASIC_URL;

export const authorizedHeaders = (token: string | null) => ({
  Authorization: `Bearer ${token}`,
});

const API: APItype = {
  ISSUE_MAIN: {
    GET: basicURL + `/issues?`,
    SEARCH: basicURL + `/issues/search?`,
    CREATE: basicURL + `/issues/form`,
  },
  ISSUE_DETAIL: {
    GET: (id) => basicURL + '/issues/' + id,
    EDIT: {
      OPTION: (id, type) => basicURL + `/issues/${id}/${type}s`,
      TITLE: (issueId) => basicURL + `/issues/${issueId}/title`,
      FILE: basicURL + `/images`,
      COMMENTS: (issueId) => basicURL + `/issues/${issueId}/comments`,
    },
    OPEN: basicURL + `/issues?status=close`,
    CLOSE: basicURL + `/issues?status=open`,
  },
  MILESTONE: {
    GET: (status) => basicURL + `/milestones?status=${status}`,
    CREATE: basicURL + `/milestones`,
    EDIT: (milestoneID) => basicURL + `/milestones/${milestoneID}`,
    DELETE: (milestoneID) => basicURL + `/milestones/${milestoneID}`,
    OPEN_CLOSE: (status) => basicURL + `/milestones?status=${status}`,
  },
  LABEL: {
    EDIT: (id) => basicURL + '/labels/' + id,
    DELETE: (id) => basicURL + '/labels/' + id,
    CREATE: basicURL + '/labels',
    GET: basicURL + '/labels',
  },
  SIGN: {
    LOGIN: (code: string) => basicURL + '/login?code=' + code,
    LOGOUT: basicURL + '/logout',
    USER: basicURL + `/userInfo`,
  },
  TAB: basicURL + `/issues/form`,
};

export default API;
