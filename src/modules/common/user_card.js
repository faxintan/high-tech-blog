import React from 'react';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Verified from '@material-ui/icons/VerifiedUser';
import Unverified from '@material-ui/icons/ErrorOutline';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@modules/common/avatar';
import DialogLogin from '@modules/dialog/login';
import { withFirebaseApp } from '@context/firebase/index';

class UserCard extends React.Component {
  state = {
    isLogin: false,
  };

  handleDialogOpen = () => {
    this.setState({ isLogin: true });
  };

  handleDialogClose = () => {
    this.setState({ isLogin: false });
  };

  render() {
    const { isLogin } = this.state;
    const { user, t, classes } = this.props;

    return (
      <>
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
            <Button
              size="small"
              color="primary"
              onClick={this.handleDialogOpen}
            >
              {t('Login')}
            </Button>
          )}
        </Grid>
        <DialogLogin visible={isLogin} onClose={this.handleDialogClose} />
      </>
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

export default withFirebaseApp(translate()(withStyles(styles)(UserCard)));
