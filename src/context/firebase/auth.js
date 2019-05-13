import React from 'react';
import * as firebase from 'firebase/app';

import 'firebase/auth';

const FirebaseAuthContext = React.createContext({});

class FirebaseAuthProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { user: null };
        /* Firebase Auth Service Module */
        this.auth = props.firebaseApp.auth();
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
        this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    
    doSignInWithFacebook = () =>
        this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    
    doSignInWithTwitter = () =>
        this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());

    doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification({
        url: 'faxintan.firebaseapp.com'
    });

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
    
    doSignOut = () => this.auth.signOut();

    render() {
        return (
            <FirebaseAuthContext.Provider value={Object.assign({user: this.state.user}, this)}>
                {this.props.children}
            </FirebaseAuthContext.Provider>
        );
    }
}

export default FirebaseAuthProvider;

export const withFirebaseAuth = Component => props => (
    <FirebaseAuthContext.Consumer>
        { firebaseAuth => <Component {...props} auth={firebaseAuth}></Component> }
    </FirebaseAuthContext.Consumer>
);