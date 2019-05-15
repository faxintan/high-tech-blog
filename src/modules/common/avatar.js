import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarImage from '@assets/images/avatar.png';
import { withStyles } from '@material-ui/styles';
import { withFirebaseAuth } from '@context/firebase/auth';

const UserAvatar = props => {
  const {
    classes,
    auth: { user },
  } = props;

  return user ? (
    <Avatar className={classes.avatar} src={user.photoURL ? user.photoURL : ''}>
      {user.photoURL ? '' : user.displayName.substr(0, 1)}
    </Avatar>
  ) : (
    <Avatar className={classes.avatar} src={AvatarImage} />
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

export default withFirebaseAuth(withStyles(styles)(UserAvatar));
