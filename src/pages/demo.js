import React from 'react';
import Test from '@components/test/test';
import FirebaseAppProveder from '@context/firebase/index';

class Demo extends React.PureComponent {
  render() {
    return (
      <FirebaseAppProveder>
        <Test />
      </FirebaseAppProveder>
    );
  }
}

export default Demo;
