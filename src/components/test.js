import React from 'react';
import { withFirebaseAuth } from '@context/firebase/auth';
import { withFirebaseStore } from '@context/firebase/firestore';

class Test extends React.PureComponent {
    constructor(props) {
        super(props);
        this.auth = props.auth;
        this.docRef = props.store.collection('Demo').doc('test01');
        this.state = {
            data: null
        }
    }

    handleLogin = () => {
        this.auth.doSignInWithGoogle();
    }

    handleLogout = () => {
        this.auth.doSignOut();
    }

    handleAddData = () => {
        this.docRef.set({
            name: 'test01',
            pass: true,
            failed: false,
        })
    }

    handleGetData = () => {
        this.docRef.get().then(doc => {
            debugger;
            if (!doc.exists) return;
            this.setState({ data: doc.data() })
        }).catch(err => {
            debugger;
            console.log(err);
        })
    }

    render() {
        const { auth: { user } } = this.props;
        return (
            <>
                <div>{JSON.stringify(user)}
                    <button onClick={this.handleLogin}>登录</button>
                    <button onClick={this.handleLogout}>登出</button>
                </div>
                <div>{JSON.stringify(this.state.data)}
                    <button onClick={this.handleAddData}>添加</button>
                    <button onClick={this.handleGetData}>获取</button>
                </div>
            </>
        );
    }
}

export default withFirebaseAuth(withFirebaseStore(Test));