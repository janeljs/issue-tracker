import { atom, selector, selectorFamily, SerializableParam, DefaultValue } from 'recoil';
import { LabelType, MilestoneType, UserType } from 'components/common/tabModal/tapDataType';
import API from 'util/api/api';
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

interface IssuesInfoStateType {
  issues: IssuesType[];
  count: countType;
}

export const issueTypeState = atom<string>({
  key: 'issueTypeState',
  default: 'open',
});

// interface IssueFilterType {
//   type: string;
//   select: string;
// }

export const isFilterFullSetting = atom<boolean>({
  key: 'isFilterFullSetting',
  default: true,
});

export const issueFilterTypeState = atom<{ key: string; name: string; isMainPage: boolean }>({
  key: 'issueFilterTypeState',
  default: { name: '', key: '', isMainPage: true },
});

export const issueFilterSelectState = atom<string>({
  key: 'issueFilterSelectState',
  default: '',
});

export const getIssueTrigger = atom<boolean>({
  key: 'getIssueTrigger',
  default: false,
});

export const getIssuesInfoState = selector<IssuesInfoStateType | null>({
  key: 'GET/issues',
  get: async ({ get }) => {
    const trigger = get(getIssueTrigger);
    const issueType = get(issueTypeState);
    const isFilterSetting = get(isFilterFullSetting);
    if (!isFilterSetting) return null;
    try {
      const response = await fetch(API.getIssue + issueType);
      console.log(response)
      const issuesData = await response.json();
      const issuesInfoState = { issues: issuesData.issues, count: issuesData.count };
      return issuesInfoState;
    } catch (err) {
      console.log('이슈 리스트 패치');
      throw err;
    }
  },
});

interface TabInfoType {
  [key: string]: any;
}

export const getTabInfoState = selector({
  key: 'GET/tabinfo',
  get: async () => {
    try {
      const response = await fetch(API.tabType);
      const tabData = await response.json();
      const tabInfos: TabInfoType = {
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

export interface selectedTabType {
  assignee: Array<UserType> | [];
  label: Array<LabelType> | [];
  milestone: MilestoneType | null;
  [key: string]: [] | Array<UserType> | Array<LabelType> | MilestoneType | null;
}

const headerInfo = {
  // headers: {
  //   Authorization: Bearer {token}
  // }
};

export const selectedTabState = selector<selectedTabType>({
  key: 'selectedTabState',
  get: ({ get }) => {
    const selectUser = get(selectedUserState);
    const selectLabel = get(selectedLabelState);
    const selectMilestone = get(selectedMilestoneState);

    return { assignee: selectUser, label: selectLabel, milestone: selectMilestone };
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

export const resetSelectedTab = selector<null>({
  key: 'resetSelectedTab',
  get: () => null,
  set: ({ reset }) => {
    reset(selectedUserState);
    reset(selectedLabelState);
    reset(selectedMilestoneState);
  },
});

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


//레이블,모달 클릭 감지 및 리셑_____________________________________
export const lableClick = atom({
  key:'lablePage',
  default: false
})
export const milestoneClick = atom({
  key:'milestone',
  default: false
})

interface TabClick{
  lableClickState: boolean;
  milestoneClickState: boolean;
}
export const lableMilestoneCtrl = selector<DefaultValue|TabClick>({
  key:'clickCtrl',
  get: ({ get }) => {
    const lableClickState = get(lableClick)
    const milestoneClickState = get(milestoneClick)
    return {lableClickState, milestoneClickState}
  },
  set: ({reset})=>{
    reset(lableClick)
    reset(milestoneClick)
  }
})