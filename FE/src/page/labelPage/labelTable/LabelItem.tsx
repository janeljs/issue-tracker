import { useState } from 'react';
import styled from 'styled-components';
import LabelBadge from 'components/atom/LabelBadge';
import { ReactComponent as DeleteIcon } from 'assets/icon/DeleteIcon.svg';
import { ReactComponent as EditIcon } from 'assets/icon/EditIcon.svg';
import { LabelType } from 'components/common/tabModal/tapDataType';
import LabelEditForm from 'page/labelPage/labelEditForm/LabelEditForm';
import { deleteLabel } from 'util/api/fetchLabel';
import { useSetRecoilState } from 'recoil';
import { labelTrigger } from 'store/labelStore';

interface Props {
  label: LabelType;
}

export default function LabelItem({ label: { id, name, color, description }, label }: Props) {
  const setLabelTrigger = useSetRecoilState(labelTrigger);
  const [isEditLabel, setIsEditLabel] = useState(false);

  const handleEditClick = () => setIsEditLabel(true);
  const handelCancelClick = () => setIsEditLabel(false);

  const handleDeleteClick = async () => {
    const deleteLabelResult = await deleteLabel(id);
    if (deleteLabelResult) setLabelTrigger((triggerCount) => triggerCount + 1);
  };

  return isEditLabel ? (
    <EditLabelItemBlock>
      <LabelEditForm
        className='label__edit-form'
        title='새로운 레이블 추가'
        {...{ handelCancelClick, label }}
      />
    </EditLabelItemBlock>
  ) : (
    <LabelItemBlock>
      <LabelBadge color={color} desc={name} className='label__badge' />
      <div className='label__description'>{description}</div>
      <div className='label__edit'>
        <div onClick={handleEditClick} className='label__btn-wrapper'>
          <EditIcon className='label__btn' />
          <span>편집</span>
        </div>
        <div onClick={handleDeleteClick} className='delete__btn label__btn-wrapper'>
          <DeleteIcon className='label__btn' />
          <span>삭제</span>
        </div>
      </div>
    </LabelItemBlock>
  );
}

const LabelItemBlock = styled.div`
  display: grid;
  grid-template-columns: 15% 70% 15%;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.color.lineGrey};
  padding: 32px;

  .label__badge {
    margin: 0;
  }
  .label__description {
    display: flex;
    color: ${({ theme }) => theme.color.fontGrey};
  }
  .label__edit {
    display: flex;
    font-size: ${({ theme }) => theme.size.sm}px;
    justify-content: flex-end;
    div {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
  }
  .label__btn {
    margin-right: 5px;
  }
  .delete__btn {
    color: ${({ theme }) => theme.color.red};
  }
  .label__btn-wrapper {
    cursor: pointer;
  }
`;

const EditLabelItemBlock = styled.div`
  .label__edit-form {
    border-radius: 0;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.color.lineGrey};
  }
`;
