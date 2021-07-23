import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

interface PrimaryButtonType {
  value: string;
  className?: string;
  onClick?: () => void;
}
function PrimaryButton({ value, className, onClick }: PrimaryButtonType) {
  return (
    <PrimaryButtonBlock onClick={onClick}>
      <Button variant='contained' size='medium' color='primary' className={className}>
        {value}
      </Button>
    </PrimaryButtonBlock>
  );
}
export default React.memo(PrimaryButton);

const PrimaryButtonBlock = styled.div`
  padding-top: 1px;
  margin-left: 10px;
`;
