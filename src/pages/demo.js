import React from 'react';
import Test from '@components/test/firebase';
import Avatar from '@modules/common/avatar';
import ThemeProvider from '@context/theme/index';
import FirebaseAppProveder from '@context/firebase/index';

class Demo extends React.PureComponent {
  render() {
    return (
      <ThemeProvider>
        <FirebaseAppProveder>
          <Test />
          <Avatar />
        </FirebaseAppProveder>
      </ThemeProvider>
    );
  }
}

export default Demo;
