import { atom, selector } from 'recoil';
import { LabelType, MilestoneType, UserType } from 'components/common/tabModal/tapDataType';
import API, { authorizedHeaders } from 'util/api/api';
interface countType {
  label: number;
  milestone: number;
  openedIssue: number;
  closedIssue: number;
}

interface LabelColorType {
  backgroundColorCode: string;
  textColorCode: string;
}

interface LabelProp {
  id: number;
  name: string;
  color: LabelColorType;
  description: string;
  checked: boolean;
}

interface IssuesType {
  assignees: string[];
  author: string;
  comment: string;
  commentNumber: number;
  createdDateTime: string;
  id: number;
  labels: LabelProp[];
  milestone: string;
  title: string;
}

export interface IssuesInfoStateType {
  issues: IssuesType[];
  count: countType;
  totalPages: number;
}

export const issueTypeState = atom<string>({
  key: 'issueTypeState',
  default: 'open',
});

export const issueFilterTypeState = atom<{ key: string; name: string }>({
  key: 'issueFilterTypeState',
  default: { name: '', key: '' },
});

//현재 선택한 option 타입이 누군지
export const issueFilterSelectState = atom<string>({
  key: 'issueFilterSelectState',
  default: '',
});

export const filterSearchInputState = selector<string>({
  key: 'filterSearchInputState',
  get: ({ get }) => {
    const issueStatus = get(issueTypeState);
    const { assignee, label, milestone, author } = get(selectedTabState);

    const statusQuery = `status:${issueStatus} `;
    const assigneeQuery = (assignee as Array<UserType>).reduce(
      (acc, user) => (acc += `assignee:${user.userName} `),
      ''
    );
    const labelQuery = (label as Array<LabelType>).reduce(
      (acc, label) => (acc += `label:${label.name} `),
      ''
    );
    const milestoneQuery = milestone ? `milestone:${milestone.title} ` : '';
    const authorQuery = author ? `author:${author.userName} ` : '';

    const query = statusQuery + assigneeQuery + labelQuery + milestoneQuery + authorQuery;
    return query.trim();
  },
});

export const getIssueTrigger = atom<number>({
  key: 'getIssueTrigger',
  default: 0,
});

export const searchWordState = atom<string>({
  key: 'searchWord',
  default: '',
});

export const searchPage = atom<number>({
  key: 'searchPage',
  default: 0,
});

interface ErrorType {
  isError: boolean;
  errorCode: number | null;
}
export const errorStatae = atom<ErrorType>({
  key: 'isError',
  default: { isError: false, errorCode: null },
});
export const getIssuesInfoState = selector<IssuesInfoStateType | number>({
  key: 'GET/issues',
  get: async ({ get }) => {
    const token = localStorage.getItem('token');
    get(getIssueTrigger);
    const searchWord = get(searchWordState);
    const pageQuery = get(searchPage);
    const issueQuery =
      get(filterSearchInputState).replace(/:/g, '=').replace(/ /g, '&') + `&page=${pageQuery}`;

    const URL = searchWord ? API.ISSUE_MAIN.SEARCH : API.ISSUE_MAIN.GET;
    const query = searchWord ? issueQuery + `&query=${searchWord}` : issueQuery;

    try {
      const response = await fetch(URL + query, {
        headers: authorizedHeaders(token),
      });
      if (response.status >= 400) throw new Error(`${response.status}`);

      const issuesData = await response.json();
      let issuesInfoState = {
        issues: issuesData.issues,
        count: issuesData.count,
        totalPages: issuesData.totalPages,
      };
      return issuesInfoState;
    } catch (err) {
      const errorCode = String(err).split(' ')[1];
      return +errorCode;
    }
  },
});

interface TabInfoType {
  assignee: Array<UserType>;
  label: Array<LabelType>;
  milestone: Array<MilestoneType>;
  [key: string]: Array<UserType> | Array<LabelType> | Array<MilestoneType>;
}

export const getTabInfoState = selector<TabInfoType>({
  key: 'GET/tabinfo',
  get: async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(API.TAB, { headers: authorizedHeaders(token) });
      const tabData = await response.json();
      const tabInfos = {
        assignee: tabData.assignees,
        label: tabData.labels,
        milestone: tabData.milestones,
      };
      return tabInfos;
    } catch (err) {
      throw new Error('잘못된 요청입니다.');
    }
  },
});

//create
export const IssueFormDataState = selector({
  key: 'create/issue/form',
  get: ({ get }) => {
    const {
      assignee: selectUser,
      label: selectLabel,
      milestone: selectMilestone,
    } = get(selectedTabState);
    const assigneeID = selectUser.map((user) => user.id);
    const labelID = selectLabel.map((label) => label.id);
    const milestoneID = selectMilestone?.id;
    return { assigneeID, labelID, milestoneID };
  },
});

export interface selectedTabType {
  assignee: Array<UserType> | [];
  label: Array<LabelType> | [];
  milestone: MilestoneType | null;
  author?: UserType | null;
  [key: string]: [] | Array<UserType> | Array<LabelType> | MilestoneType | UserType | null | void;
}

export const selectedUserState = atom<Array<UserType> | []>({
  key: 'selectedUserTabState',
  default: [],
});

export const selectedLabelState = atom<Array<LabelType> | []>({
  key: 'selectedLabelTabState',
  default: [],
});

export const selectedMilestoneState = atom<MilestoneType | null>({
  key: 'selectedMilestoneTabState',
  default: null,
});

export const selectedAuthorState = atom<UserType | null>({
  key: 'selectedAuthorState',
  default: null,
});

export const selectedTabState = selector<selectedTabType>({
  key: 'selectedTabState',
  get: ({ get }) => {
    const selectUser = get(selectedUserState);
    const selectLabel = get(selectedLabelState);
    const selectMilestone = get(selectedMilestoneState);
    const selectAuthor = get(selectedAuthorState);
    return {
      assignee: selectUser,
      label: selectLabel,
      milestone: selectMilestone,
      author: selectAuthor,
    };
  },
  set: ({ set }, newValue) => {
    const { assignee, label, milestone, author } = newValue as selectedTabType;
    set(selectedUserState, assignee);
    set(selectedLabelState, label);
    set(selectedMilestoneState, milestone);
    if (author) set(selectedAuthorState, author);
  },
});

export const resetSelectedTab = selector<null>({
  key: 'resetSelectedTab',
  get: () => null,
  set: ({ reset }) => {
    reset(selectedUserState);
    reset(selectedLabelState);
    reset(selectedMilestoneState);
    reset(selectedAuthorState);
  },
});
