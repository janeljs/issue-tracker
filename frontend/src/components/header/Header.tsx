import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginState, loginDataState } from 'store/loginStore';
import ProfileImg from 'components/atom/ProfileImg';
import { getIssueTrigger } from 'store/issueInfoStore';
import { Link } from 'react-router-dom';

const useStyle = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    fontFamily: "'Raleway', sans-serif",
    fontSize: '30px',
  },
  modalStyles: {
    backgroundColor: 'red',
  },
}));

function Header() {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const loginData = useRecoilValue(loginDataState);
  const isLogin = useRecoilValue(isLoginState);
  const setIssueTrigger = useSetRecoilState(getIssueTrigger);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toolbarStyle = {
    padding: '0 80px',
  };
  const handleLogoClick = () => {
    setIssueTrigger(true);
  };
  return (
    <HeaderBlock isLogin={isLogin}>
      <AppBar position='static' color='transparent'>
        <Toolbar style={toolbarStyle}>
          <Typography className={classes.typographyStyles}>
            <Link to='/main' onClick={handleLogoClick}>
              Issue Tracker
            </Link>
          </Typography>
          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              {loginData ? (
                <ProfileImg avatarURL={loginData?.avatarUrl} className='login__profile-img' />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            <Menu id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>{loginData?.userName}</MenuItem>
              <MenuItem onClick={handleClose} className={classes.modalStyles + ' header__modal'}>
                My account
              </MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </HeaderBlock>
  );
}

export default Header;

interface StyleProps {
  isLogin: boolean;
}

const HeaderBlock = styled.div<StyleProps>`
  display: ${({ isLogin }) => (isLogin ? 'block' : 'none')};
  .login__profile-img {
    width: 30px;
    height: 30px;
  }
  .header__modal {
    position: absolute;
    top: 60 px;
    background-color: red;
    color: ;
  }
`;
