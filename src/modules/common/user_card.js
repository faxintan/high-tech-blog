import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Verified from '@material-ui/icons/VerifiedUser';
import Unverified from '@material-ui/icons/ErrorOutline';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@modules/common/avatar';
import { withFirebaseApp } from '@context/firebase/index';

class UserCard extends React.Component {
  render() {
    const { classes, user } = this.props;

    return (
      <Grid
        className={classes.root}
        item
        container
        justify="center"
        alignItems="center"
        direction="column"
        wrap="nowrap"
      >
        <Grid style={{ marginBottom: '10px' }} item>
          <Avatar sizes="50px" />
        </Grid>
        {user ? (
          <>
            <Grid item>
              <Typography>{user.displayName}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="title1">
                {user.email}
                {user.emailVerified ? (
                  <Verified className={classes.icon1} />
                ) : (
                  <Unverified className={classes.icon2} />
                )}
              </Typography>
            </Grid>
          </>
        ) : (
          <div>请登录</div>
        )}
      </Grid>
    );
  }
}

const styles = theme => ({
  root: {
    height: theme.spacing(20),
  },
  icon1: {
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(2),
    verticalAlign: 'middle',
    color: 'green',
  },
  icon2: {
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(2),
    verticalAlign: 'middle',
    color: 'red',
  },
});

export default withFirebaseApp(withStyles(styles)(UserCard));
