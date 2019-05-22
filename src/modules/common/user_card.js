import React from 'react';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Verified from '@material-ui/icons/VerifiedUser';
import Unverified from '@material-ui/icons/ErrorOutline';
import IconClose from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Link from '@components/common/link';
import Avatar from '@modules/common/avatar';
import DialogLogin from '@modules/dialog/login';
import { withFirebaseApp } from '@context/firebase/index';

class UserCard extends React.Component {
  state = {
    isShowLogin: false,
  };

  handleLoginOpen = () => {
    this.setState({ isShowLogin: true });
  };

  handleLoginClose = () => {
    this.setState({ isShowLogin: false });
  };

  handleLogout = () => {
    this.props.auth.doSignOut();
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
              <Grid item container justify="center">
                <Button color="primary" onClick={this.handleLoginOpen}>
                  {t('Switch')}
                </Button>
                <Button color="primary" onClick={this.handleLogout}>
                  {t('Logout')}
                </Button>
              </Grid>
            </>
          ) : (
            <Button color="primary">
              <Link to="/login">{t('Login')}</Link>
            </Button>
          )}
        </Grid>
        <DialogLogin
          IconClose={
            <IconButton onClick={this.handleLoginClose}>
              <IconClose />
            </IconButton>
          }
          visible={isShowLogin}
          onSuccess={this.handleLoginClose}
        />
      </>
    );
  }
}

const styles = theme => ({
  root: {
    height: theme.spacing(24),
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
