import { atom, selector } from 'recoil';

//레이블,모달 클릭 감지 및 리셑_____________________________________

interface labelMilestoneStateType {
  label: boolean;
  milestone: boolean;
}

export const labelMilestoneClickedState = atom<labelMilestoneStateType>({
  key: 'labelMilestoneState',
  default: { label: false, milestone: false },
});

export const resetTabClickedState = selector({
  key: 'resetTabClickedState',
  get: ({ get }) => {
    const tabClickedState = get(labelMilestoneClickedState);
    return tabClickedState;
  },
  set: ({ reset }) => {
    reset(labelMilestoneClickedState);
  },
});

// export const lableClick = atom({
//   key: 'lablePage',
//   default: false,
// });
// export const milestoneClick = atom({
//   key: 'milestone',
//   default: false,
// });

// interface TabClick {
//   lableClickState: boolean;
//   milestoneClickState: boolean;
// }
// export const lableMilestoneCtrl = selector<DefaultValue | TabClick>({
//   key: 'clickCtrl',
//   get: ({ get }) => {
//     const lableClickState = get(lableClick);
//     const milestoneClickState = get(milestoneClick);
//     return { lableClickState, milestoneClickState };
//   },
//   set: ({ reset }) => {
//     reset(lableClick);
//     reset(milestoneClick);
//   },
// });
