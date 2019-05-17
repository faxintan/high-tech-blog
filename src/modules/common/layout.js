import React from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import LanguageIcon from '@material-ui/icons/Language';

import DropDown from '@components/common/dropdown';
import DefaultHeader from '@modules/common/header';
import FirebaseProvider from '@context/firebase/index';
import ThemeProvider, { withTheme } from '@context/theme/index';
import I18nextProvider, { withI18next } from '@context/i18next/index';

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

class Layout extends React.Component {
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
    const { Header, Sidebar, children, pageContext } = this.props;

    return (
      <FirebaseProvider>
        <I18nextProvider pageContext={pageContext}>
          <ThemeProvider isSupportI18next={true}>
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
                    actions={
                      <>
                        <IconButton
                          color="secondary"
                          onClick={this.handleShowLngPopover}
                        >
                          <LanguageIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          color="secondary"
                          onClick={this.handleShowThemePopover}
                        >
                          <AppsIcon />
                        </IconButton>
                      </>
                    }
                  />
                )}
              </Grid>

              <Grid item xs={12} container zeroMinWidth>
                {Sidebar && (
                  <Grid item xs="auto">
                    {Sidebar}
                  </Grid>
                )}
                {
                  <Grid item xs={12}>
                    {children}
                  </Grid>
                }
              </Grid>

              <Popover
                id={123}
                open={Boolean(popType)}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={this.handleClosePopover}
              >
                {popType === POP_SHOW_SWITCH_THEME && <DrowDownThemes />}
                {popType === POP_SHOW_SWITCH_LANGUAGE && <DrowDownLanguage />}
              </Popover>
            </Grid>
          </ThemeProvider>
        </I18nextProvider>
      </FirebaseProvider>
    );
  }
}

export default Layout;
