import { atom, selector } from 'recoil';
import API, { authorizedHeaders } from 'util/api/api';
export const milestoneTrigger = atom<number>({
  key: 'milestoneTrigger',
  default: 0,
});

export const MilestoneStatus = atom<boolean>({
  key: 'isOpenMilestone',
  default: true,
});

export const getMilestones = selector({
  key: 'GET/milestones',
  get: async ({ get }) => {
    const token = localStorage.getItem('token');
    const isOpenMilestone = get(MilestoneStatus);
    let status = isOpenMilestone ? 'open' : 'close';
    console.log(status);
    try {
      get(milestoneTrigger);
      const response = await fetch(API.MILESTONE.GET(status), {
        headers: authorizedHeaders(token),
      });
      const milestoneData = await response.json();
      return milestoneData;
    } catch (error) {
      console.log('마일스톤조회 에러:', error);
    }
  },
});
