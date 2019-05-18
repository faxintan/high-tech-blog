import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import FirebaseProvider from '@context/firebase/index';
import ThemeProvider from '@context/theme/index';
import I18nextProvider from '@context/i18next/index';

import DefaultMenu from '@modules/common/menu';
import DefaultHeader from '@modules/common/header';
import { throttle } from '@utils/index';

class Layout extends React.Component {
  state = {
    isShowSideBar: false,
  };

  handleSearch = throttle(text => {
    console.log(text); // TODO(LOuis): search for info
  });

  handleToggleSideBar = () => {
    this.setState(state => ({ isShowSideBar: !state.isShowSideBar }));
  };

  render() {
    const { isShowSideBar } = this.state;
    const { Header, children, pageContext } = this.props;

    return (
      <FirebaseProvider>
        <I18nextProvider pageContext={pageContext}>
          <ThemeProvider>
            <CssBaseline />

            <Grid
              container
              wrap="nowrap"
              direction="column"
              style={{ height: '100vh' }}
            >
              <Grid item xs="auto" zeroMinWidth>
                {Header ? (
                  Header
                ) : (
                  <DefaultHeader
                    onClick={this.handleToggleSideBar}
                    onChange={this.handleSearch}
                  />
                )}
              </Grid>

              <Grid item xs={12} container wrap="nowrap" zeroMinWidth>
                <Grid item xs="auto">
                  <DefaultMenu visible={isShowSideBar} />
                </Grid>
                <Grid item xs={12}>
                  {children}
                </Grid>
              </Grid>
            </Grid>
          </ThemeProvider>
        </I18nextProvider>
      </FirebaseProvider>
    );
  }
}

export default Layout;
