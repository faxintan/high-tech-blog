export default class FirebaseAuth {
  constructor(firebase, auth, config) {
    /* Firebase Auth Service Module */
    this.auth = auth;
    this.config = config;
    this.firebase = firebase;
  }

  /* Firebase Auth Services APIs */
  onAuthStateChanged = callback => this.auth.onAuthStateChanged(callback);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(new this.firebase.auth.GoogleAuthProvider());

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(new this.firebase.auth.FacebookAuthProvider());

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(new this.firebase.auth.TwitterAuthProvider());

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: this.config.authDomain,
    });

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doSignOut = () => this.auth.signOut();
}
