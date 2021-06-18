import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

interface PrimaryButtonType {
  value: string;
  className?: string;
  onClick?: () => Promise<void> | void;
}

export default function PrimaryButton({ value, className, onClick }: PrimaryButtonType) {
  return (
    <PrimaryButtonBlock onClick={onClick}>
      <Button variant='contained' size='medium' color='primary' className={className}>
        {value}
      </Button>
    </PrimaryButtonBlock>
  );
}

const PrimaryButtonBlock = styled.div`
  padding-top: 1px;
  margin-left: 10px;
`;
