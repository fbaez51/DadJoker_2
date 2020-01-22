import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Joke } from './components/Joke';
import { TopJokes } from './components/TopJokes';
import Login from './components/Login';
import { Security, ImplicitCallback } from '@okta/okta-react';

import './css/App.css'


function onAuthRequired({ history }) {
    history.push('/login');
}

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