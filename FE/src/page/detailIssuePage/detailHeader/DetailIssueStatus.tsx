import React from 'react';
import styled from 'styled-components';
import { ReactComponent as OpenIcon } from 'assets/icon/LabelLargeOpen.svg';
import { ReactComponent as CloseIcon } from 'assets/icon/LabelLargeClose.svg';

interface Props {
  status: boolean;
}

export default function DetailIssueStatus({ status }: Props) {
  return <DetailIssueStatusBlock>{status ? <OpenIcon /> : <CloseIcon />}</DetailIssueStatusBlock>;
}

const DetailIssueStatusBlock = styled.div``;
