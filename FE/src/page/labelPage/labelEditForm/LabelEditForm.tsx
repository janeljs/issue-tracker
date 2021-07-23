import React, { useState } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { labelTrigger } from 'store/labelStore';
import LabelEdit from 'page/labelPage/labelEditForm/LabelEdit';
import { LabelType } from 'components/common/tabModal/tapDataType';
import PrimaryButton from 'components/atom/PrimaryButton';
import { createLabel, editLabel } from 'util/api/fetchLabel';
import useInput from 'hooks/useInput';

interface Props {
  className?: string;
  title: string;
  label?: LabelType;
  handelCancelClick: () => void;
}
function LabelEditForm({ className, title, label = DEFAULT_LABEL, handelCancelClick }: Props) {
  const setLabelTrigger = useSetRecoilState(labelTrigger);

  const titleInput = useInput(label.name);
  const descriptionInput = useInput(label.description);
  const colorInput = useInput(label.color.backgroundColorCode);

  const [labelTextColor, setLabelTextColor] = useState(label.color.textColorCode);

  const handleSubmitClick = async () => {
    const newLabelData = {
      name: titleInput.value,
      description: descriptionInput.value,
      color: {
        backgroundColorCode: colorInput.value,
        textColorCode: labelTextColor,
      },
    };

    let postLabelResult = false;
    //POST - id===0 : create / id !== 0 : edit
    if (label.id === 0) postLabelResult = await createLabel(newLabelData);
    else postLabelResult = await editLabel(label.id, newLabelData);

    if (postLabelResult) {
      setLabelTrigger((triggerCount) => triggerCount + 1);
      handelCancelClick();
    }
  };

  return (
    <LabelEditFormBlock className={className}>
      <div className='form__title'>{title}</div>
      <div className='form__edit'>
        <LabelEdit
          {...{
            titleInput,
            descriptionInput,
            colorInput,
            label,
            setLabelTextColor,
          }}
        />
      </div>
      <div className='form__submit'>
        <PrimaryButton onClick={handelCancelClick} value=' 취소' className='form__cancel-btn' />
        <PrimaryButton onClick={handleSubmitClick} value='+ 완료' className='form__submit-btn' />
      </div>
    </LabelEditFormBlock>
  );
}
export default React.memo(LabelEditForm);
const DEFAULT_LABEL = {
  id: 0,
  name: '',
  description: '',
  checked: false,
  color: {
    backgroundColorCode: '#EFF0F6',
    textColorCode: '#000',
  },
};

const LabelEditFormBlock = styled.div`
  padding: 2rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.color.lineGrey};
  border-radius: 16px;
  .form__title {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
  .form__submit {
    display: flex;
    justify-content: flex-end;
    .form__cancel-btn {
      width: 120px;
      background-color: ${({ theme }) => theme.color.blueGrey};
    }
    .form__submit-btn {
      width: 120px;
      background-color: ${({ theme }) => theme.color.skyblue};
    }
  }
`;
