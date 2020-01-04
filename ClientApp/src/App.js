import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

import './custom.css'

import { Security, ImplicitCallback } from '@okta/okta-react';

const config = {
    issuer: 'https://dev-623447.okta.com/oauth2/default',
    redirectUri: window.location.origin + '/implicit/callback',
    clientId: '0oa2deq7veEwu5oNr357',
    pkce: true
}

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Router>
                <Security {...config}>
                    <Layout>
                        <Route exact path='/' component={Home} />
                        <Route path='/counter' component={Counter} />
                        <Route path='/fetch-data' component={FetchData} />
                        <Route path='/implicit/callback' component={ImplicitCallback} />
                    </Layout>
                </Security >
            </Router >
        );
    }
}
