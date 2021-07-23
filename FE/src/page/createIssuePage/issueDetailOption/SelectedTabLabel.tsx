import React from 'react';
import styled from 'styled-components';
import { LabelType } from 'components/common/tabModal/tapDataType';
import LabelBadge from 'components/atom/LabelBadge';

interface Props {
  label: LabelType;
}

export default function SelectedTabLabel({ label }: Props) {
  return (
    <SelectedTabLabelBlock>
      <LabelBadge color={label.color} desc={label.name} />
    </SelectedTabLabelBlock>
  );
}

const SelectedTabLabelBlock = styled.div`
  & > div {
    margin: 0 8px 0 0;
  }
`;
