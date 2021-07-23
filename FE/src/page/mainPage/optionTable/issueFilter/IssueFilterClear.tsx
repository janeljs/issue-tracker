import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';
import { useResetRecoilState } from 'recoil';
import { resetSelectedTab } from 'store/issueInfoStore';
function IssueFilterClear() {
  const resetFilter = useResetRecoilState(resetSelectedTab);
  const handleClick = () => resetFilter();
  return (
    <FilterClearBlock onClick={handleClick}>
      <CancelIcon />
      <div>Clear current search query, filters, and sorts</div>
    </FilterClearBlock>
  );
}

export default IssueFilterClear;
const FilterClearBlock = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.fontGrey};
  font-weight: ${({ theme }) => theme.weight.bold};
  cursor: pointer;
  margin-top: 1rem;
  &:hover {
    color: ${({ theme }) => theme.color.blue};
  }
  div {
    margin-left: 0.5rem;
  }
`;
