import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import IssueFilterModal from './IssueFilterModal';
import SearchInput from './SearchInput';
import useToggle from 'hooks/useToggle';
import IssueFilterBtn from './IssueFilterBtn';
import IssueFilterClear from './IssueFilterClear';

import { useRecoilValue } from 'recoil';
import { filterSearchInputState } from 'store/issueInfoStore';
export default function IssueFilter(): ReactElement {
  const filterButtonRef = useRef<HTMLDivElement>(null);
  const filterModalRef = useRef<HTMLDivElement>(null);
  const { open } = useToggle({ toggle: [filterButtonRef], modal: filterModalRef });

  const searchInput = useRecoilValue(filterSearchInputState);
  let isDefaultSearch =
    searchInput === 'status:open' || searchInput === 'status:close' ? true : false;

  return (
    <IssueFilterBlock>
      <div className='filter-tab-searchInput'>
        <IssueFilterBtn filterButtonRef={filterButtonRef} />
        <SearchInput />
      </div>
      {!isDefaultSearch && <IssueFilterClear />}
      {open && <IssueFilterModal modalRef={filterModalRef} />}
    </IssueFilterBlock>
  );
}

const IssueFilterBlock = styled.div`
  .filter-tab-searchInput {
    display: flex;
  }
`;
