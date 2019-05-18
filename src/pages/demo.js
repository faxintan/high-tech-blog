import React from 'react';
import Test from '@components/test/firebase';
import Avatar from '@modules/common/avatar';
import ThemeProvider from '@context/theme/index';
import I18nextProvider from '@context/i18next/index';
import FirebaseAppProveder from '@context/firebase/index';
import { withI18next } from 'gatsby-plugin-i18next';

class Demo extends React.PureComponent {
  render() {
    return (
      <FirebaseAppProveder>
        <I18nextProvider pageContext={this.props.pageContext}>
          <ThemeProvider>
            <Test />
            <Avatar />
          </ThemeProvider>
        </I18nextProvider>
      </FirebaseAppProveder>
    );
  }
}

export default withI18next()(Demo);
