import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import '../css/LoginButton.css';

export default withAuth(class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        // Redirect to '/' after login
        this.props.auth.login('/');
    }

    async logout() {
        // Redirect to '/' after logout
        this.props.auth.logout('/');
    }

    render() {
        if (this.state.authenticated === null) return null;


        const button = this.state.authenticated ?
            <Button outline color="danger" onClick={this.logout}>Logout</Button> :
            <Button outline color="primary" onClick={this.login}>Login</Button>;

        return (
            <div>
                {button}
            </div>
        );

                        //<Link to='/'>Home</Link><br />
                //<Link to='/protected'>Protected</Link><br />

        //return this.state.authenticated ?
        //    <Button outline color="danger" onClick={this.logout}>Logout</Button> :
        //    <Button outline color="primary" onClick={this.login}>Login</Button>;
    }
});