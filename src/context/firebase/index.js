import React from 'react';
import * as firebase from 'firebase/app';
import FirebaseAuthProvider from '@context/firebase/auth';
import FirebaseStoreProvider from '@context/firebase/firestore';

const config = {
    apiKey: "AIzaSyBVJ1bOpbijAVO7VgU9_Vs9EtdYTUs1LVM",
    authDomain: "faxintan.firebaseapp.com",
    databaseURL: "https://faxintan.firebaseio.com",
    projectId: "faxintan",
    storageBucket: "faxintan.appspot.com",
    messagingSenderId: "397443523525",
    appId: "1:397443523525:web:72bb44e5a631e20a"
}

const FirebaseAppContext = React.createContext({});

class FirebaseAppProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.app = firebase.initializeApp(props.config || config);
    }

    render() {
        return (
            <FirebaseAppContext.Provider value={this.app}>
                <FirebaseAuthProvider firebaseApp={this.app}>
                    <FirebaseStoreProvider firebaseApp={this.app}>
                        {this.props.children}
                    </FirebaseStoreProvider>
                </FirebaseAuthProvider>
            </FirebaseAppContext.Provider>
        );
    }
}

export default FirebaseAppProvider;

export const withFirebaseApp = Component => props => (
    <FirebaseAppContext.Consumer>
        { firebaseApp => <Component {...props} firebaseApp={firebaseApp} /> }
    </FirebaseAppContext.Consumer>
);