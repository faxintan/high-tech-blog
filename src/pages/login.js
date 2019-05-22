import React from 'react';
import { Helmet } from "react-helmet";
import { translate } from 'react-i18next';
import ThemeProvider from '@context/theme/index';
import I18nextProvider from '@context/i18next/index';
import FirebaseAppProveder from '@context/firebase/index';
import { withI18next } from 'gatsby-plugin-i18next';
import LoginDialog from '@modules/dialog/login';

class LoginPage extends React.PureComponent {
  render() {
    const { t } = this.props;
    return (
      <>
        <Helmet>
          <title>{t('Login')}</title>
        </Helmet>
        <FirebaseAppProveder>
          <I18nextProvider pageContext={this.props.pageContext}>
            <ThemeProvider>
              <LoginDialog visible={true} />
            </ThemeProvider>
          </I18nextProvider>
        </FirebaseAppProveder>
      </>
    );
  }
}

export default withI18next()(translate()(LoginPage));

export const query = graphql`
  query($lng: String!) {
    locales: allLocale(filter: { lng: { eq: $lng } }) {
      ...TranslationFragment
    }
  }
`;
