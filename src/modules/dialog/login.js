import React from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconEmail from '@material-ui/icons/Email';
import IconLock from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withI18next } from '@context/i18next/index';
import { withFirebaseApp } from '@context/firebase/index';

import ChromeLogo from '@assets/images/chrome.png';
import FacebookLogo from '@assets/images/facebook.png';
import TwitterLogo from '@assets/images/twitter.png';

let email, password;
const validate = (email, password) => {
  if (!email || !password) return false;
  return true;
};

class DialogLogin extends React.Component {
  handleEmailChange = e => {
    email = e.currentTarget.value;
  };

  handlePasswordChange = e => {
    password = e.currentTarget.value;
  };

  handleLogin = () => {
    if (!validate(email, password)) return; // TODO(Louis): failed to login
    this.props.auth.doSignInWithEmailAndPassword(email, password).then(user => {
      user && this.hanldeLoginSuccess(user);
    });
  };

  handleLoginWithProvider = type => {
    const providers = [
      'doSignInWithGoogle',
      'doSignInWithFacebook',
      'doSignInWithTwitter',
    ];
    this.props.auth[providers[type]]().then(user => {
      user && this.hanldeLoginSuccess(user);
    });
  };

  hanldeLoginSuccess = user => {
    const { i18next, onSuccess } = this.props;
    onSuccess ? onSuccess(user) : navigate(`/${i18next.lng}/`);
  };

  render() {
    const { visible, IconClose, i18next, classes, fullScreen } = this.props;

    return (
      <Dialog open={visible} fullScreen={fullScreen}>
        <DialogTitle className={classes.title} disableTypography={true}>
          <Typography variant="h6">{i18next.t('Login')}</Typography>
          {IconClose}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <Grid
            container
            spacing={2}
            wrap="nowrap"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <IconEmail />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label={i18next.t('Email')}
                onChange={this.handleEmailChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            wrap="nowrap"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <IconLock />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                fullWidth={true}
                label={i18next.t('Password')}
                onChange={this.handlePasswordChange}
              />
            </Grid>
          </Grid>
          <Hidden xsDown>
            <Grid className={classes.provider} container>
              <Grid item xs={3} />
              <Grid className={classes.icon} item xs={2}>
                <IconButton onClick={() => this.handleLoginWithProvider(0)}>
                  <Avatar src={ChromeLogo}>G</Avatar>
                </IconButton>
              </Grid>
              <Grid className={classes.icon} item xs={2}>
                <IconButton onClick={() => this.handleLoginWithProvider(1)}>
                  <Avatar src={FacebookLogo}>F</Avatar>
                </IconButton>
              </Grid>
              <Grid className={classes.icon} item xs={2}>
                <IconButton onClick={() => this.handleLoginWithProvider(2)}>
                  <Avatar src={TwitterLogo}>T</Avatar>
                </IconButton>
              </Grid>
              <Grid item xs={3} />
            </Grid>
          </Hidden>
        </DialogContent>
        <DialogActions>
          <Button
            variant={fullScreen ? 'contained' : 'text'}
            color="primary"
            fullWidth={fullScreen}
            onClick={this.handleLogin}
          >
            {i18next.t('Confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DialogLogin.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

const styles = theme => ({
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      minWidth: '400px',
    },
  },
  provider: {
    marginTop: theme.spacing(3),
  },
  icon: {
    textAlign: 'center',
  },
});

export default withFirebaseApp(
  withI18next(
    withStyles(styles)(withMobileDialog({ breakpoint: 'xs' })(DialogLogin))
  )
);
