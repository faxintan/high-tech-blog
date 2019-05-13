import React from 'react';
import getThemeList from '@context/theme/list';
import { ThemeProvider } from '@material-ui/styles';
import { pick, str_encrypt, str_decrypt } from '@utils/index';

const themeContext = React.createContext({});

export default class extends React.PureComponent {
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

  getList = () => {
    return this._themes;
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
      pick(this, ['getList', 'getById', 'updateById']),
      { current: id }
    );
    return (
      <themeContext.Provider value={theme}>
        <ThemeProvider theme={instance}>{this.props.children}</ThemeProvider>
      </themeContext.Provider>
    );
  }
}

export const withTheme = Component => props => {
  return (
    <themeContext.Consumer>
      {theme => <Component {...props} theme={theme} />}
    </themeContext.Consumer>
  );
};
