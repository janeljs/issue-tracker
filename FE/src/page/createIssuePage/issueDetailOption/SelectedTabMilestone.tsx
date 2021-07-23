import React from 'react';
import styled from 'styled-components';
import { MilestoneType } from 'components/common/tabModal/tapDataType';

interface Props {
  milestone: MilestoneType;
}

export default function SelectedTabMilestone({ milestone }: Props) {
  return (
    <SelectedTabMilestoneBlock>
      <div className='progress'></div>
      <div className='selected__milestone'>{milestone.title}</div>
    </SelectedTabMilestoneBlock>
  );
}

const SelectedTabMilestoneBlock = styled.div``;
