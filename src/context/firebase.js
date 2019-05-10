import React from 'react';

// This import loads the firebase namespace along with all its type information.
import * as firebase from 'firebase/app';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBVJ1bOpbijAVO7VgU9_Vs9EtdYTUs1LVM",
    authDomain: "faxintan.firebaseapp.com",
    databaseURL: "https://faxintan.firebaseio.com",
    projectId: "faxintan",
    storageBucket: "faxintan.appspot.com",
    messagingSenderId: "397443523525",
    appId: "1:397443523525:web:72bb44e5a631e20a"
}

const FirebaseContext = React.createContext({});

class FirebsaeProvider extends React.PureComponent {
    state = {
        user: null,
    }

    constructor(props) {
        super(props);

        /* Firebase Init */
        this.app = firebase.initializeApp(props.config || config);

        /* Firebase Services Modules */
        this.auth = this.app.auth();
        this.db = this.app.database();
    }

    componentDidMount() {
        /* Firebase Auth State Change Callback */
        this.auth.onAuthStateChanged(user => {
            this.setState({ user });
        });
    }

    /* Firebase Auth Services APIs */
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(new this.app.auth.GoogleAuthProvider());
    
    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(new this.app.auth.FacebookAuthProvider());
    
    doSignInWithTwitter = () =>
        this.auth.signInWithPopup(new this.app.auth.TwitterAuthProvider());

    doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification({
        url: config.authDomain
    });

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
    
    doSignOut = () => this.auth.signOut();

    /* Firebase Firestore Services APIs */
    doConnectFirestore = (store) => this.db.ref(store);
    
    doConnectFirestoreByUser = (store, uid) => this.db.ref(`${store}/${uid}`);

    render() {
        <FirebaseContext.Provider value={Object.assign(this.state, { app: this })}>
            {this.props.children}
        </FirebaseContext.Provider>
    }
}

export default FirebsaeProvider;

export const withFirebase = Component => props => {
    <FirebaseContext.Consumer>
        { firebase => <Component {...props} firebase={firebase}></Component> }
    </FirebaseContext.Consumer>
}