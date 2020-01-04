import { withAuth } from '@okta/okta-react';
import React, { Component, useState } from 'react';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../css/JokeContent.css';
import { Fade, Container, Row, Col, Button } from 'reactstrap';
import face_neutral_image from '../images/face_neutral.png';
import face_smile_image from '../images/face_smile.png';
import face_funny_image from '../images/face_funny.png';
//import authService  from './api-authorization/AuthorizeService';

async function checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated && !this.state.userinfo) {
        const userinfo = await this.props.auth.getUser();
        this.setState({ userinfo });
        this.setState({ isAuthenticated: authenticated });
    }
}

export default withAuth(class JokeContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jokesID: 0
            , jokesQuestion: null
            , jokesAnswer: null
            , jokesIndex: 0
            , fadeInQuestion: true
            , fadeInAnswer: true
            , fadeInRating: true
            , isAuthenticated: false
            , userName: null
            , userinfo: null
        };
        //TEsting
        this.checkAuthentication = checkAuthentication.bind(this);

        this.toggleFadeQuestion = this.toggleFadeQuestion.bind(this);
        this.toggleFadeAnswer = this.toggleFadeAnswer.bind(this);
        this.toggleFadeRating = this.toggleFadeRating.bind(this);
        this.fadeInJokeQuestion = this.fadeInJokeQuestion.bind(this);
        this.fadeInJokeAnswer = this.fadeInJokeAnswer.bind(this);
        this.fadeOutJokeQuestion = this.fadeOutJokeQuestion.bind(this);
        this.fadeOutJokeAnswer = this.fadeOutJokeAnswer.bind(this);
        this.NextJoke = this.NextJoke.bind(this);
        this.TestJoke = this.TestJoke.bind(this);

        this.AuthorizedRatingRendering = this.AuthorizedRatingRendering.bind(this);

        this.VoteNeutral = this.VoteNeutral.bind(this);
        this.VoteSmile = this.VoteSmile.bind(this);
        this.VoteFunny = this.VoteFunny.bind(this);

        this.JokeRatingUpsert = this.JokeRatingUpsert.bind(this);

        this.NoMoreJokesRender = this.NoMoreJokesRender.bind(this);
    }

    componentDidMount() {
        this.setState({ jokesID: this.props.jokes[this.state.jokesIndex].jokeID });
        this.setState({ jokesQuestion: this.props.jokes[this.state.jokesIndex].question });
        this.setState({ jokesAnswer: this.props.jokes[this.state.jokesIndex].answer });
        this.setState({ jokesIndex: this.state.jokesIndex + 1 });
        this.populateAuthenticationState();

        this.checkAuthentication();
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    async populateAuthenticationState() {
        //   const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        //this.setState({
        //    isAuthenticated,
        //    userName: user && user.name
        //});
    }

    toggleFadeQuestion() {
        this.setState({
            fadeInQuestion: !this.state.fadeInQuestion
        });
    }

    toggleFadeAnswer() {
        this.setState({
            fadeInAnswer: !this.state.fadeInAnswer
        });
    }

    toggleFadeRating() {
        this.setState({
            fadeInRating: !this.state.fadeInRating
        });
    }

    fadeInJokeQuestion() {
        setTimeout(() => {
            this.toggleFadeQuestion();
        }, 500);
    }

    fadeInJokeAnswer() {
        setTimeout(() => {
            this.toggleFadeAnswer();
        }, 2000);
    }

    fadeInJokeRating() {
        setTimeout(() => {
            this.toggleFadeRating();
        }, 3000);
    }

    fadeOutJokeQuestion() {
        this.toggleFadeQuestion();
    }

    fadeOutJokeAnswer() {
        this.toggleFadeAnswer();
    }

    fadeOutJokeRating() {
        this.toggleFadeRating();
    }

    NextJoke() {
        this.fadeOutJokeQuestion();
        this.fadeOutJokeAnswer();
        this.fadeOutJokeRating();

        setTimeout(() => {
            this.setState({ jokesIndex: this.state.jokesIndex + 1 });

            if (this.state.jokesIndex < this.props.jokes.length) {

                this.setState({ jokesID: this.props.jokes[this.state.jokesIndex].jokeID });
                this.setState({ jokesQuestion: this.props.jokes[this.state.jokesIndex].question });
                this.setState({ jokesAnswer: this.props.jokes[this.state.jokesIndex].answer });
            }
            else {
                alert("No more jokes :( (Placeholder)");
            }
        }, 500);

        this.fadeInJokeQuestion();
        this.fadeInJokeAnswer();
        this.fadeInJokeRating();
    }

    async TestJoke() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated) {
            alert(this.state.userinfo.name);

            let a = this.state.userinfo;
            //sub
            //given_name
            //email
            //"00u2cyl2rtcakLvIL357"
            alert(a);
        }

        // this.state.userinfo.name
        //const authenticated = await this.props.auth.isAuthenticated();
        //alert(authenticated);
        //alert("s");

        //fetch('api/Login/TestTask')
        //    .then(response => response.json())
    }

    VoteNeutral() {
        let jokerating = {
            "JokeID": this.state.jokesID
            , "UserName": this.state.userName
            , "JokeRatingByUser": 1
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

        this.NextJoke();
    }

    VoteSmile() {
        let jokerating = {
            "JokeID": this.state.jokesID
            , "UserName": this.state.userName
            , "JokeRatingByUser": 2
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

        this.NextJoke();
    }

    VoteFunny() {
        let jokerating = {
            "JokeID": this.state.jokesID
            , "UserName": this.state.userName
            , "JokeRatingByUser": 3
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

        this.NextJoke();
    }

    JokeRatingUpsert(rating) {
        let jokerating = {
            "JokeID": this.state.jokesID
            , "UserName": this.state.userName
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


    AuthorizedRatingRendering() {
        //alert(this.state.isAuthenticated);

        if (this.state.isAuthenticated) {
            return (
                <div>
                    <Fade in={this.state.fadeInRating}>
                        <Row>
                            <Col></Col>
                            <Col> <input onClick={this.VoteNeutral} disabled={!this.state.fadeInRating} class="faceRating" type="image" src={face_neutral_image} /></Col>
                            <Col> <input onClick={this.VoteSmile} disabled={!this.state.fadeInRating} class="faceRating" type="image" src={face_smile_image} /></Col>
                            <Col> <input onClick={this.VoteFunny} disabled={!this.state.fadeInRating} class="faceRating" type="image" src={face_funny_image} /></Col>
                            <Col></Col>
                        </Row>
                    </Fade>
                </div>
            )
        }
        else
            return (
                <div>
                    <Fade in={this.state.fadeInRating}>
                        <Row>
                            <Col>Please login to rate these jokes!</Col>
                        </Row>
                        <Row>
                            <br />
                        </Row>
                        <Row>
                            <Col><Button onClick={this.NextJoke} color="success">Next Joke!</Button></Col>
                            <Col><Button onClick={this.TestJoke} color="success">Test</Button></Col>
                        </Row>
                    </Fade>
                </div>

            )
    }

    NoMoreJokesRender() {
        return (
            <div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div class="centered">
                    <div class="joketextdisplay">
                        <div>

                            <Container>
                                <Row>
                                    <Col xs="1"></Col>
                                    <Col xs="10">
                                        <Fade in={this.state.fadeInQuestion}>
                                            <h1> {this.state.jokesQuestion}</h1>
                                        </Fade>
                                    </Col>
                                    <Col xs="1"></Col>
                                </Row>
                                <Row>
                                    <br />
                                </Row>
                                <Row>
                                    <Col xs="1"></Col>
                                    <Col xs="10">
                                        <Fade in={this.state.fadeInAnswer}>
                                            <h1><i>{this.state.jokesAnswer}</i></h1>
                                        </Fade>
                                    </Col>
                                    <Col xs="1"></Col>
                                </Row>
                                <Row>
                                    <br />
                                </Row>
                                <div>
                                    {this.AuthorizedRatingRendering()}
                                </div>
                            </Container>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});