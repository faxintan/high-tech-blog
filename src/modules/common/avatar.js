import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarImage from '@assets/images/avatar.png';
import { withStyles } from '@material-ui/styles';
import { withFirebaseApp } from '@context/firebase/index';

const UserAvatar = props => {
  const { sizes, user, classes } = props;
  return user ? (
    <Avatar
      className={classes.avatar}
      style={{ width: sizes, height: sizes }}
      src={user.photoURL ? user.photoURL : ''}
    >
      {user.photoURL
        ? ''
        : user.displayName
        ? user.displayName.substr(0, 1)
        : '?'}
    </Avatar>
  ) : (
    <Avatar
      className={classes.avatar}
      style={{ width: sizes, height: sizes }}
      src={AvatarImage}
    />
  );
};

const styles = theme => {
  return {
    avatar: {
      width: '30px',
      height: '30px',
      [theme.breakpoints.up('sm')]: {
        width: '36px;',
        height: '36px',
      },
    },
  };
};

export default withFirebaseApp(withStyles(styles)(UserAvatar));
