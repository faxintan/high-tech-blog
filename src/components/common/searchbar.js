import React from 'react';
import { withStyles } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';

class SearchBar extends React.Component {
  handleInputChange = event => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  render() {
    const { defaultValue, text, className, classes } = this.props;
    return (
      <div className={classes.search + ' ' + className}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
            focused: classes.inputFocused,
          }}
          placeholder={text}
          defaultValue={defaultValue}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

const styles = theme => {
  return {
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.1),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      width: 'auto',
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '0px',
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      '&:focus': { width: '100%' },
    },
  };
};

export default withStyles(styles)(SearchBar);
