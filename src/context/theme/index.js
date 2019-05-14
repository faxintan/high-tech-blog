import React from 'react';
import { translate } from 'react-i18next';
import getThemeList from '@context/theme/list';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { pick, str_encrypt, str_decrypt } from '@utils/index';

/*
 ** theme context module
 **
 ** @props         -       current: themeID
 ** @methods       -       getAll, getById, updateById
 ** @params        -       data(graphQL), pageContext
 */

const themeContext = React.createContext({});

class ThemeProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this._themes = getThemeList(props.t);
    this.state = { theme: this._themes[0] };
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      const id = str_decrypt(localStorage.getItem('theme')); // TODO(Louis): optimize
      this.setState({ theme: this.getById(id) || this._themes[0] });
    }
  }

  getAll = () => {
    return this._themes.slice();
  };

  getById = id => {
    return this._themes.filter(item => item.id === id)[0];
  };

  // TODO(Louis): store to service
  updateById = id => {
    const theme = this.getById(id);
    if (!theme) return;
    if (process.env.BROWSER) {
      localStorage.setItem('theme', str_encrypt(theme.id));
    }
    this.setState({ theme });
  };

  render() {
    const { id, instance } = this.state.theme;
    const theme = Object.assign(
      pick(this, ['getAll', 'getById', 'updateById']),
      { current: id }
    );
    return (
      <themeContext.Provider value={theme}>
        <MuiThemeProvider theme={instance}>
          {this.props.children}
        </MuiThemeProvider>
      </themeContext.Provider>
    );
  }
}

export default translate()(ThemeProvider);

export const withTheme = Component => props => {
  return (
    <themeContext.Consumer>
      {theme => <Component {...props} theme={theme} />}
    </themeContext.Consumer>
  );
};
