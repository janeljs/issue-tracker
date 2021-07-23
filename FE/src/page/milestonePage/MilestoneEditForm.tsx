import React, { useMemo, Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { milestoneTrigger } from 'store/milestoneStore';
import Title from 'components/atom/Title';
import PrimaryButton from 'components/atom/PrimaryButton';
import PrimaryOutlinedButton from 'components/atom/PrimaryOutlinedButton';
import { MilestoneType } from 'components/common/tabModal/tapDataType';
import { fetchCreateMilestone, editMilestone } from 'util/api/fetchHandleMilestone';
import useInput from 'hooks/useInput';
import InputField from 'components/atom/InputField';
interface EditType {
  type?: string;
  milestone?: MilestoneType;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}
function MilestoneEditForm({ type = 'create', setEditMode, milestone }: EditType) {
  const setMilestoneTrigger = useSetRecoilState(milestoneTrigger);
  const [dateInputError, setDateError] = useState(false);
  const title = useInput(milestone?.title || '');
  const date = useInput(milestone?.dueDate || '');
  const description = useInput(milestone?.description || '');
  const milestoneID = milestone?.id || 0;
  const alertDateTypeError = () => setDateError(true);

  const handleSubmit = async () => {
    const timeChecking = (date: string) => {
      const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
      return regex.test(date);
    };

    if (!timeChecking(date.value)) {
      alertDateTypeError();
      return;
    }

    const newMilestone = {
      title: title.value,
      dueDate: date.value,
      description: description.value,
    };

    let statusCode;
    if (type === 'create') statusCode = await fetchCreateMilestone(newMilestone);
    else statusCode = await editMilestone(milestoneID, newMilestone);

    if (statusCode === 200) {
      if (setEditMode) setEditMode(false);
      setMilestoneTrigger((trigger) => trigger + 1);
    }
  };

  const handleClick = () => setEditMode && setEditMode(false);

  const pageTitle = useMemo(
    () => (type === 'create' ? '새로운 마일스톤 추가' : '마일스톤 편집'),
    [type]
  );

  return (
    <MilestoneEditBlock type={type}>
      <Title className='milestone__add'>{pageTitle}</Title>
      <MilestoneInputBlock>
        <div>
          <InputField label={'제목*'} {...title} />
          <InputField label={'완료일*'} {...date} placeholder='YYYY - MM - DD' />
        </div>

        {dateInputError && (
          <ErrorMessage>▮날짜 입력 양식이 잘못되었습니다 'YYYY - MM - DD' </ErrorMessage>
        )}
        <InputField label={'설명(선택)'} {...description} />
      </MilestoneInputBlock>
      <div className='milestone__add__submit'>
        {type !== 'create' && <PrimaryOutlinedButton value={'× 취소'} onClick={handleClick} />}
        <PrimaryButton value={'+ 완료'} onClick={handleSubmit} />
      </div>
    </MilestoneEditBlock>
  );
}

export default React.memo(MilestoneEditForm);
interface style {
  type: string;
}
const MilestoneEditBlock = styled.div<style>`
  padding: 2rem;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.color.lineGrey};
  border-radius: 0px;
  ${({ type, theme }) =>
    type === 'create' &&
    `margin-bottom: 1.5rem; border-radius: 16px;
		border: 1px solid ${theme.color.lineGrey};`};
  .milestone__add__submit {
    display: flex;
    justify-content: flex-end;
  }
`;

const MilestoneInputBlock = styled.div`
  position: relative;
  & > div {
    margin-bottom: 1rem;
    align-items: center;
  }
  & > div:first-child {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.color.red};
  font-size: ${({ theme }) => theme.size.sm}px;
  font-weight: ${({ theme }) => theme.weight.bold};
  position: absolute;
  left: 51%;
  top: 21px;
`;
