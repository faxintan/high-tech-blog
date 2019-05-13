import React from 'react';
import 'firebase/database';

const FirebaseDBContext = React.createContext({});

class FirebaseDBProvider extends React.PureComponent {
    constructor(props) {
        super(props);
        /* Firebase DataBase Service Module */
        this.db = {} || this.props.firebaseApp.database();
    }

    /* Firebase Firestore Services APIs */
    doConnectFirestore = (store) => this.db.ref(store)

    doConnectFirestoreByUser = (store, uid) => this.db.ref(`${store}/${uid}`)

    render() {
        return (
            <FirebaseDBContext.Provider value={this}>
                {this.props.children}
            </FirebaseDBContext.Provider>
        );
    }
}

export default FirebaseDBProvider;

export const withFirebaseDB = Component => props => (
    <FirebaseDBContext.Consumer>
        { db => <Component {...props} db={db}></Component> }
    </FirebaseDBContext.Consumer>
);

