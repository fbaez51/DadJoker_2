import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Joke } from './components/Joke';
import { TopJokes } from './components/TopJokes';
import Login from './components/Login';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Protected from './components/Protected';

import './css/App.css'


function onAuthRequired({ history }) {
    history.push('/login');
}

//const config = {
//    issuer: 'https://dev-623447.okta.com/oauth2/default',
//    redirectUri: window.location.origin + '/implicit/callback',
//    clientId: '0oa2deq7veEwu5oNr357',
//    onAuthRequired: { onAuthRequired },
//    pkce: true
//}

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Security issuer='https://dev-623447.okta.com/oauth2/default'
                    clientId='0oa2deq7veEwu5oNr357'
                    redirectUri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
                    pkce={true} >
                    <Layout>
                        <Route path='/' exact={true} component={Joke} />
                        <Route path='/topjokes' exact={true} component={TopJokes} />
                        <Route path='/login' render={() => <Login baseUrl='https://dev-623447.okta.com' />} />
                        <Route path='/implicit/callback' component={ImplicitCallback} />
                    </Layout>
                </Security >
            </Router >
        );
    }
}

       //<SecureRoute path='/protected' component={Protected} />