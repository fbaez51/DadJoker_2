import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { withAuth } from '@okta/okta-react';

import face_neutral_image from '../images/face_neutral.png';
import face_smile_image from '../images/face_smile.png';
import face_funny_image from '../images/face_funny.png';

export default withAuth(class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: null
            , userinfo: null
        };
        this.checkAuthentication = this.checkAuthentication.bind(this);
        this.checkAuthentication();

        this.VoteNeutral = this.VoteNeutral.bind(this);
        this.VoteSmile = this.VoteSmile.bind(this);
        this.VoteFunny = this.VoteFunny.bind(this);

        this.JokeRatingUpsert = this.JokeRatingUpsert.bind(this);
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });

            if (authenticated && !this.state.userinfo) {
                const userinfo = await this.props.auth.getUser();
                this.setState({ userinfo });
            }
        }
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    VoteNeutral() {
        this.JokeRatingUpsert(1);
        this.props.nextJoke();
    }

    VoteSmile() {
        this.JokeRatingUpsert(2);
        this.props.nextJoke();
    }

    VoteFunny() {
        this.JokeRatingUpsert(3);
        this.props.nextJoke();
    }

    JokeRatingUpsert(rating) {
        let jokerating = {
            "JokeID": this.props.jokeID
            , "UserID": this.state.userinfo.sub
            , "JokeRatingByUser": rating
        };

        fetch('api/JokeRating/RatingUpsert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                jokerating
            )
        })
    }

    renderRateButtons() {
        return (
            <div>
                <Row>
                    <Col></Col>
                    <Col> <input onClick={this.VoteNeutral} disabled={!this.props.disabled} class="faceRating" type="image" src={face_neutral_image} /></Col>
                    <Col> <input onClick={this.VoteSmile} disabled={!this.props.disabled} class="faceRating" type="image" src={face_smile_image} /></Col>
                    <Col> <input onClick={this.VoteFunny} disabled={!this.props.disabled}  class="faceRating" type="image" src={face_funny_image} /></Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }

    renderNextJoke() {
        return (
            <div>
                <Row>
                    <Col>Please login to rate these jokes!</Col>
                </Row>
                <Row>
                    <br />
                </Row>
                <Row>
                    <Col><Button onClick={this.props.nextJoke} disabled={!this.props.disabled} color="success">Next Joke!</Button></Col>
                </Row>
            </div>
        )
    }

    render() {
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ?
            this.renderRateButtons() :
            this.renderNextJoke();
    }
});