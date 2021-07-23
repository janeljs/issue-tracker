import { useState } from 'react';
import styled from 'styled-components';
import MyPortal from 'Portal';

function LoadingProgress() {
  const [style, setStyle] = useState({});

  setTimeout(() => {
    const loadingDone = { width: '100%' };
    setStyle(loadingDone);
  }, 0);
  return (
    <MyPortal>
      <ProgressBlock style={style}>
        <div>LOADING</div>
      </ProgressBlock>
    </MyPortal>
  );
}

export default LoadingProgress;
const ProgressBlock = styled.div`
  width: 0%;
  position: absolute;
  top: 65px;
  height: 10px;
  background-color: ${({ theme }) => theme.color.blue};
  text-indent: 9999px;
  transition: 0.5s ease 0.3s;
`;
