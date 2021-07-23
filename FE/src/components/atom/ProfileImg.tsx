import React, { ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import styled from 'styled-components';

interface Props {
  avatarURL?: string;
  isSmall?: boolean;
  className?: string;
}
function ProfileImg({
  avatarURL = process.env.REACT_APP_PROFILE,
  isSmall = false,
  className,
}: Props): ReactElement {
  const classes = useStyles();
  const avatarSize = isSmall ? classes.small : classes.large;
  return (
    <ProfileImgBlock>
      <Avatar
        alt='avatarImg'
        src={avatarURL}
        className={`${avatarSize} avatar__img ${className}`}
      />
    </ProfileImgBlock>
  );
}

export default React.memo(ProfileImg);

const ProfileImgBlock = styled.div`
  .avatar__img {
    border: 1px solid #d9dbe9;
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  })
);
