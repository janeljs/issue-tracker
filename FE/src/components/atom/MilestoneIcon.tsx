import React from 'react';
import styled from 'styled-components';

interface MilestoneIconProps {
  sizeType?: number;
}
function MilestoneIcon({ sizeType = 12 }: MilestoneIconProps) {
  return (
    <MilestoneIconBlock style={{ width: 'fit-content' }}>
      <img src={process.env.PUBLIC_URL + '/miles.png'} alt='milestoneIcon' width={sizeType} height={sizeType} />
    </MilestoneIconBlock>
  );
}

export default MilestoneIcon;

const MilestoneIconBlock = styled.div`
  display: flex;
  margin: 0 7px;
`;
