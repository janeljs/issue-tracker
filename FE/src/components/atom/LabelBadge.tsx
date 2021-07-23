import React from 'react';
import styled from 'styled-components';
import { LabelColorType } from 'page/mainPage/issueTable/issueType';

interface LabelBadgeProps {
  color: LabelColorType;
  desc?: string;
  className?: string;
}
function LabelBadge({ color, desc, className }: LabelBadgeProps) {
  return (
    <LabelBadgeBlock labelColor={color} className={className}>
      {desc}
    </LabelBadgeBlock>
  );
}

interface StyledProps {
  labelColor: LabelColorType;
}

const LabelBadgeBlock = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  padding: 0 5px;
  height: 20px;
  width: auto;
  max-width: 100px;
  text-align: center;
  border-radius: 30px;
  font-size: ${({ theme }) => theme.size.sm}px;
  color: ${({ labelColor }) => labelColor.textColorCode};
  background-color: ${({ labelColor }) => labelColor.backgroundColorCode};
`;

export default React.memo(LabelBadge);
