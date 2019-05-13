import React from 'react';
import { navigate } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import LanguageIcon from '@material-ui/icons/Language';

import DropDown from '@components/ui/dropdown';
import DefaultHeader from '@components/layout/header';

const POP_HIDDEN = 0;
const POP_SHOW_SWITCH_THEME = 1;
const POP_SHOW_SWITCH_LANGUAGE = 2;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    const { t, pageContext: p } = props;
    let curThemeName = t('Default');
    if (process.env.BROWSER) {
      curThemeName = localStorage.getItem(`theme_${p.lng}`);
    }

    this.state = {
      anchorEl: null,
      popType: POP_HIDDEN,
      theme: this.themes[curThemeName],
    };
  }

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

  handleSwitchTheme = name => {
    if (!Object.keys(this.themes).includes(name)) return;
    const { pageContext: p } = this.props;
    if (process.env.BROWSER) {
      localStorage.setItem(`theme_${p.lng}`, name);
    }
    this.setState({ theme: this.themes[name] });
  };

  handleSwitchLanguage = lng => {
    const { pageContext } = this.props;
    const language = this.languages[lng];
    if (!pageContext.availableLngs.includes(language)) return;
    navigate(`/${language}${pageContext.originalPath || '/'}`);
  };

  render() {
    const { theme, popType, anchorEl } = this.state;
    const { Header, Sidebar, children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <FirebsaeProvider>
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
              open={Boolean(popType)}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={this.handleClosePopover}
            >
              {popType === POP_SHOW_SWITCH_THEME && (
                <DropDown
                  data={Object.keys(this.themes)}
                  handleSelect={this.handleSwitchTheme}
                />
              )}
              {popType === POP_SHOW_SWITCH_LANGUAGE && (
                <DropDown
                  data={Object.keys(this.languages)}
                  handleSelect={this.handleSwitchLanguage}
                />
              )}
            </Popover>
          </Grid>
        </FirebsaeProvider>
      </ThemeProvider>
    );
  }
}

export default withFirebase(Layout);
