export default interface newAPItype {
  ISSUE_MAIN: { GET: string; SEARCH: string; CREATE: string };
  ISSUE_DETAIL: {
    GET: (id: number) => string;
    EDIT: {
      OPTION: (id: number, type: string) => string;
      TITLE: (issueId: number) => string;
      FILE: string;
      COMMENTS: (issueId: number) => string;
    };
    OPEN: string;
    CLOSE: string;
  };
  MILESTONE: {
    GET: (status: string) => string;
    CREATE: string;
    EDIT: (milestoneID: number) => string;
    DELETE: (milestoneID: number) => string;
    OPEN_CLOSE: (status: string) => string;
  };
  LABEL: {
    EDIT: (id: number) => string;
    DELETE: (id: number) => string;
    GET: string;
    CREATE: string;
  };
  SIGN: {
    LOGIN: (code: string) => string;
    LOGOUT: string;
    USER: string;
  };
  TAB: string;
}
