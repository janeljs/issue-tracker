import { atom, selector } from 'recoil';
import { fetchGetLabelData, LabelDataType } from 'util/api/fetchLabel';

export const labelTrigger = atom<number>({
  key: 'labelTrigger',
  default: 0,
});

export const getLabelData = selector<LabelDataType>({
  key: 'GET/labelData',
  get: async ({ get }) => {

    get(labelTrigger);
    const labelData = await fetchGetLabelData();
    return labelData;
  },
});
