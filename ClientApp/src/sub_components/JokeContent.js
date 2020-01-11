import { withAuth } from '@okta/okta-react';
import React, { Component, useState } from 'react';
import { Fade, Container, Row, Col, Button } from 'reactstrap';
import RateJokeButton from './RateJokeButton';
import '../css/JokeContent.css';

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
        };

        this.checkAuthentication = checkAuthentication.bind(this);

        this.setInitialJoke = this.setInitialJoke.bind(this);

        this.toggleFadeQuestion = this.toggleFadeQuestion.bind(this);
        this.toggleFadeAnswer = this.toggleFadeAnswer.bind(this);
        this.toggleFadeRating = this.toggleFadeRating.bind(this);
        this.fadeInJokeQuestion = this.fadeInJokeQuestion.bind(this);
        this.fadeInJokeAnswer = this.fadeInJokeAnswer.bind(this);
        this.fadeOutJokeQuestion = this.fadeOutJokeQuestion.bind(this);
        this.fadeOutJokeAnswer = this.fadeOutJokeAnswer.bind(this);
        this.NextJoke = this.NextJoke.bind(this);

        this.getCurrentJokeID = this.getCurrentJokeID.bind(this);

        this.NoMoreJokesRender = this.NoMoreJokesRender.bind(this);
    }

    componentDidMount() {
        this.setInitialJoke();
        this.checkAuthentication();
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    setInitialJoke() {
        this.setState({ jokesID: this.props.jokes[this.state.jokesIndex].jokeID });
        this.setState({ jokesQuestion: this.props.jokes[this.state.jokesIndex].question });
        this.setState({ jokesAnswer: this.props.jokes[this.state.jokesIndex].answer });
        this.setState({ jokesIndex: this.state.jokesIndex + 1 });
    }

    getCurrentJokeID() {
        return this.state.jokesID;
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
                                    <Fade in={this.state.fadeInRating}>
                                        <RateJokeButton nextJoke={this.NextJoke} jokeID={this.state.jokesID} disabled={this.state.fadeInRating} />
                                    </Fade>
                                </div>
                            </Container>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});