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

const providers = [
  'doSignInWithGoogle',
  'doSignInWithFacebook',
  'doSignInWithTwitter',
];

class UserCard extends React.Component {
  state = {
    isShowLogin: false,
  };

  handleLogin = (email, password) => {
    const { auth } = this.props;
    auth.doSignInWithEmailAndPassword(email, password).then(user => {
      user && this.setState({ isShowLogin: false });
    });
  };

  handleLoginWithProvider = type => {
    const { auth } = this.props;
    auth[providers[type]] &&
      auth[providers[type]]().then(user => {
        user && this.setState({ isShowLogin: false });
      });
  };

  handleLogout = () => {
    const { auth } = this.props;
    auth.doSignOut();
  };

  handleDialogOpen = () => {
    this.setState({ isShowLogin: true });
  };

  handleDialogClose = () => {
    this.setState({ isShowLogin: false });
  };

  render() {
    const { isShowLogin } = this.state;
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
                <Typography variant="caption">
                  {user.email}
                  {user.emailVerified ? (
                    <Verified className={classes.icon1} />
                  ) : (
                    <Unverified className={classes.icon2} />
                  )}
                </Typography>
              </Grid>
              <Button color="primary" onClick={this.handleLogout}>
                {t('Logout')}
              </Button>
            </>
          ) : (
            <Button color="primary" onClick={this.handleDialogOpen}>
              {t('Login')}
            </Button>
          )}
        </Grid>
        <DialogLogin
          visible={isShowLogin}
          onConfirm={this.handleLogin}
          onCancel={this.handleDialogClose}
          onLoginWithProvider={this.handleLoginWithProvider}
        />
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
