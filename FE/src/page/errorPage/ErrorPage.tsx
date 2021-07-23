import styled from 'styled-components';
interface ErrorType {
  errorCode?: number;
}
export default function ErrorPage({ errorCode }: ErrorType) {
  return (
    <ErrorPageBlock>
      <h1>This page isn't working🛠</h1>
    </ErrorPageBlock>
  );
}
const ErrorPageBlock = styled.div`
  background: white;
  z-index: 9999;
  width: 110%;
  height: 110%;
  positoin: absolute;
  top: 55px;
  padding: 83px;
  left: 0;
`;
