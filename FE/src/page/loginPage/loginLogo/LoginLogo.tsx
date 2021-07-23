import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

export default function LoginLogo(): ReactElement {
  return (
    <LoginLogoBlock>
      <Avatar className='logo__avatar'>
        <LockOutlinedIcon />
      </Avatar>
      <Typography className='logo__typography' component='h1' variant='h5'>
        Issue Tracker
      </Typography>
    </LoginLogoBlock>
  );
}

const LoginLogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo__avatar {
    margin: 8px;
    background-color: #f50057;
  }
  .logo__typography {
    font-size: 30px;
    font-family: 'Raleway', sans-serif;
    font-weight: 800;
  }
`;
