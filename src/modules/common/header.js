import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Popover from '@material-ui/core/Popover';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';

import Avatar from '@/modules/common/avatar';
import DropDown from '@components/common/dropdown';
import SearchBar from '@components/common/searchbar';
import { withTheme } from '@context/theme/index';
import { withI18next } from '@context/i18next/index';

const POP_HIDDEN = 0;
const POP_SHOW_SWITCH_THEME = 1;
const POP_SHOW_SWITCH_LANGUAGE = 2;

const DrowDownThemes = withTheme(props => {
  const { current, getAll, updateById } = props.theme;
  return (
    <DropDown
      data={getAll()}
      checked={current}
      handleSelect={item => updateById(item.id)}
    />
  );
});

const DrowDownLanguage = withI18next(props => {
  const { lng, getAll, updateById } = props.i18next;
  return (
    <DropDown
      data={getAll()}
      checked={lng}
      handleSelect={item => updateById(item.id)}
    />
  );
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    popType: POP_HIDDEN,
  };

  handleShowLngPopover = event => {
    this.setState({
      anchorEl: event.currentTarget,
      popType: POP_SHOW_SWITCH_LANGUAGE,
    });
  };

  handleShowThemePopover = event => {
    this.setState({
      anchorEl: event.currentTarget,
      popType: POP_SHOW_SWITCH_THEME,
    });
  };

  handleClosePopover = () => {
    this.setState({ anchorEl: null, popType: POP_HIDDEN });
  };

  render() {
    const { popType, anchorEl } = this.state;
    const { t, classes, onClick, onChange } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="secondary"
            aria-label="Open drawer"
            onClick={onClick}
          >
            <Avatar />
          </IconButton>

          <Hidden xsDown>
            <Typography className={classes.title} variant="h5" noWrap>
              {t('Hi-Tech Blog')}
            </Typography>
          </Hidden>

          <div className={classes.span} />

          <SearchBar className={classes.search} onChange={onChange} />

          <IconButton color="secondary" onClick={this.handleShowLngPopover}>
            <LanguageIcon />
          </IconButton>

          <IconButton
            edge="end"
            color="secondary"
            onClick={this.handleShowThemePopover}
          >
            <AppsIcon />
          </IconButton>
        </Toolbar>

        <Popover
          open={Boolean(popType)}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={this.handleClosePopover}
        >
          {popType === POP_SHOW_SWITCH_THEME && <DrowDownThemes />}
          {popType === POP_SHOW_SWITCH_LANGUAGE && <DrowDownLanguage />}
        </Popover>
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
      marginRight: theme.spacing(2),
    },
    span: {
      flexGrow: 1,
    },
  };
};

export default translate()(withStyles(styles)(Header));
