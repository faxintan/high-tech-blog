import { createMuiTheme } from '@material-ui/core/styles';

export default translate => {
  return [
    {
      id: 'default',
      name: translate('Default'),
      instance: createMuiTheme({
        palette: {
          type: 'light',
          primary: { light: '#666666', main: '#222222', dark: '#000000' },
          secondary: { light: '#ffffff', main: '#ffffff', dark: '#eeeeee' },
          tonalOffset: 0.2, //  to shift a color's luminance by approximately two indexes within its tonal palette
          contrastThreshold: 3, // Used by `getContrastText()` to maximize the contrast between the background and the text.
        },
        typography: {
          fontSize: 14,
          htmlFontSize: 16, // 62.5% of 16px = 10px
          fontWeightMedium: 500,
          body1: {
            fontWeight: 500,
          },
          title1: {
            fontSize: 14,
          },
          subtitle1: {
            fontSize: 12,
          },
          button: {
            fontWeight: 900,
          },
        },
        overrides: {
          // MuiButton: {
          //   // Name of the component ⚛️ / style sheet
          //   text: {
          //     // Name of the rule
          //     padding: '0 30px',
          //     height: 48,
          //     color: 'white',
          //     border: 0,
          //     borderRadius: 3,
          //     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          //     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          //   },
          // },
        },
      }),
    },
    {
      id: 'white',
      name: translate('White'),
      instance: createMuiTheme({
        palette: {
          primary: { main: '#fff' },
          secondary: { main: '#000' },
        },
      }),
    },
  ];
};
