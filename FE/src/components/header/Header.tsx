import React from 'react';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { controlLoginState } from 'store/loginStore';
import {
  getIssueTrigger,
  resetSelectedTab,
  issueTypeState,
  searchPage,
} from 'store/issueInfoStore';
import ProfileImg from 'components/atom/ProfileImg';
import { fetchLogOut } from 'util/api/fetchLogin';

const useStyle = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
    fontFamily: "'Raleway', sans-serif",
    fontSize: '30px',
  },
}));

function Header() {
  const history = useHistory();
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [{ isLogin, loginData }, setLoginState] = useRecoilState(controlLoginState);
  const setIssueTrigger = useSetRecoilState(getIssueTrigger);
  const resetSelectTab = useSetRecoilState(resetSelectedTab);
  const setIssueOpen = useSetRecoilState(issueTypeState);
  const setPage = useSetRecoilState(searchPage);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const toolbarStyle = {
    padding: '0 80px',
  };
  const handleLogoClick = () => {
    setIssueTrigger((triggerCount) => triggerCount + 1);
    resetSelectTab(null);
    setIssueOpen('open');
    setPage(1);
  };

  const handelLogOutClick = async () => {
    const logoutResult = await fetchLogOut();
    if (logoutResult) {
      setAnchorEl(null);
      localStorage.clear();
      setLoginState({ isLogin: false, loginData: null });
      history.push('/');
    }
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
              color='inherit'>
              {loginData ? (
                <ProfileImg avatarURL={loginData?.avatarUrl} className='login__profile-img' />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            <Menu id='menu-appbar' anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>{loginData?.name}</MenuItem>
              <MenuItem onClick={handleClose} className={'header__modal'}>
                My account*
              </MenuItem>
              <MenuItem onClick={handelLogOutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </HeaderBlock>
  );
}

export default React.memo(Header);

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
