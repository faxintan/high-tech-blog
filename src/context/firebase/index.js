import React from 'react';
import FirebaseAuth from '@context/firebase/auth';

const config = {
  apiKey: 'AIzaSyBVJ1bOpbijAVO7VgU9_Vs9EtdYTUs1LVM',
  authDomain: 'faxintan.firebaseapp.com',
  databaseURL: 'https://faxintan.firebaseio.com',
  projectId: 'faxintan',
  storageBucket: 'faxintan.appspot.com',
  messagingSenderId: '397443523525',
  appId: '1:397443523525:web:72bb44e5a631e20a',
};

const FirebaseAppContext = React.createContext({});

class FirebaseAppProvider extends React.PureComponent {
  state = {
    user: null,
    auth: null,
    store: null,
    firebase: null,
  };

  componentDidMount() {
    const firebase = import('firebase/app');
    const fireauth = import('firebase/auth');
    const firestore = import('firebase/firestore');

    Promise.all([firebase, fireauth, firestore]).then(values => {
      const app = values[0].apps.length
        ? values[0].app()
        : values[0].initializeApp(config);

      const auth = new FirebaseAuth(values[0], app.auth(), config);

      this.unsubscribe = auth.onAuthStateChanged(user => {
        this.setState({ user });
      });

      this.setState({
        auth,
        firebase: app,
        store: app.firestore(),
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe(); // 解除事件监听，防止内存泄漏
  }

  render() {
    return (
      <FirebaseAppContext.Provider value={this.state}>
        {this.props.children}
      </FirebaseAppContext.Provider>
    );
  }
}

export default FirebaseAppProvider;

export const withFirebaseApp = Component => props => (
  <FirebaseAppContext.Consumer>
    {firebaseApp => <Component {...props} {...firebaseApp} />}
  </FirebaseAppContext.Consumer>
);
