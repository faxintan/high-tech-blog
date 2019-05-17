import React from 'react';
import { withFirebaseApp } from '@context/firebase/index';

class Test extends React.PureComponent {
  state = {
    data: null,
  };

  handleLogin = () => {
    this.auth.doSignInWithGoogle();
  };

  handleLogout = () => {
    this.auth.doSignOut();
  };

  handleAddData = () => {
    this.docRef.set({
      name: 'test01',
      pass: true,
      failed: false,
    });
  };

  handleGetData = () => {
    this.docRef
      .get()
      .then(doc => {
        debugger;
        if (!doc.exists) return;
        this.setState({ data: doc.data() });
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
  };

  render() {
    if (!this.props.firebase) return <div>Test</div>;
    const { auth, store, user } = this.props;
    this.auth = auth;
    this.docRef = store.collection('Demo').doc('test01');
    return (
      <>
        <div>
          {JSON.stringify(user)}
          <button onClick={this.handleLogin}>登录</button>
          <button onClick={this.handleLogout}>登出</button>
        </div>
        <div>
          {JSON.stringify(this.state.data)}
          <button onClick={this.handleAddData}>添加</button>
          <button onClick={this.handleGetData}>获取</button>
        </div>
      </>
    );
  }
}

export default withFirebaseApp(Test);
