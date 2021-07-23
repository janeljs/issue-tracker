import { atom, selector } from 'recoil';
import { fetchIssueDetail } from 'util/api/fetchIssueDetail';

export const detailIdState = atom({
  key: 'detailIssueId',
  default: 0,
});

export const detailIssueTrigger = atom({
  key: 'detailIssueTrigger',
  default: 0,
});

export const getDetailIssueData = selector({
  key: 'GET/DetailIssueData',
  get: async ({ get }) => {
    get(detailIssueTrigger);
    const id = get(detailIdState);
    if (!id) return;
    const detailData = await fetchIssueDetail(id);
    return detailData;
  },
});

export const titleEditMode = atom({
  key: 'view/editMode',
  default: false,
});

export const detailTitle = atom<string>({
  key: 'detail/title',
  default: '제목 없음',
});
