import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconClose from '@material-ui/icons/Close';
import IconEmail from '@material-ui/icons/Email';
import IconLock from '@material-ui/icons/Lock';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

function DialogLogin(props) {
  const { visible, onClose, t, classes, fullScreen } = props;

  return (
    <Dialog open={visible} fullScreen={fullScreen}>
      <DialogTitle className={classes.title} disableTypography={true}>
        <Typography variant="h6">{t('Login')}</Typography>
        <IconButton onClick={onClose}>
          <IconClose />
        </IconButton>
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
            <TextField fullWidth={true} label="请输入账号" />
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
            <TextField type="password" fullWidth={true} label="请输入密码" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          variant={fullScreen ? 'contained' : ''}
          color="primary"
          fullWidth={fullScreen}
          onClick={onClose}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
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
  actions: {
    marginTop: theme.spacing(2),
  },
});

export default translate()(
  withStyles(styles)(withMobileDialog({ breakpoint: 'xs' })(DialogLogin))
);
