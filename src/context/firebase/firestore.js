import React from 'react';
import 'firebase/firestore';

/* 
** Related APIs
** https://firebase.google.com/docs/firestore/query-data/get-data?authuser=0
*/

const FirebaseStoreContext = React.createContext({});

class FirebaseStoreProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        /* Firebase FireStore Service Module */
        this.store = this.props.firebaseApp.firestore();
    }

    /* Firebase Firestore Services APIs */
    // getStoreByName = (col, doc) => this.store.collection(col).doc(doc)

    render() {
        return (
            <FirebaseStoreContext.Provider value={this.store}>
                {this.props.children}
            </FirebaseStoreContext.Provider>
        );
    }
}

export default FirebaseStoreProvider;

export const withFirebaseStore = Component => props => (
    <FirebaseStoreContext.Consumer>
        { store => <Component {...props} store={store} /> }
    </FirebaseStoreContext.Consumer>
);

