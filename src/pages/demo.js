import React from 'react';
import Test from '@components/test/firebase';
import Avatar from '@modules/common/avatar';
import FirebaseAppProveder from '@context/firebase/index';

class Demo extends React.PureComponent {
  render() {
    return (
      <FirebaseAppProveder>
        {/* <Test /> */}
        {<Avatar />}
      </FirebaseAppProveder>
    );
  }
}

export default Demo;
