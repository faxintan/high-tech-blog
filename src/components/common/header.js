import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SearchBar from '@components/common/searchbar';

class Header extends React.Component {
  render() {
    const { t, classes, actions } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="secondary" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>

          <Hidden xsDown>
            <Typography className={classes.title} variant="h5" noWrap>
              {t('High-Tech Blog')}
            </Typography>
          </Hidden>

          <div className={classes.span} />

          <SearchBar className={classes.search} />

          <Hidden xsDown>{actions}</Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = theme => {
  return {
    wrapper: {
      positionSticky: '0px',
    },
    title: {
      marginLeft: theme.spacing(3),
    },
    search: {
      marginRight: theme.spacing(3),
    },
    span: {
      flexGrow: 1,
    },
  };
};

export default translate()(withStyles(styles)(Header));
