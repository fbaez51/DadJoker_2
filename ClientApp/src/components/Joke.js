import React, { Component } from 'react';
import JokeContent from '../sub_components/JokeContent.js'

export class Joke extends Component {
    static displayName = Joke.name;

    constructor(props) {
        super(props);
        this.state = { jokes: [], loading: true };
        this.FetchData = this.FetchData.bind(this);
        this.RenderJoke = this.RenderJoke.bind(this);
    }

    componentDidMount() {
        this.FetchData();
    }

    FetchData() {
        fetch('api/Joke/FetchAllJokes')
            .then(response => response.json())
            .then(data => {
                this.setState({ jokes: data, loading: false });
            });
    }

    RenderJoke() {
        return (
            <React.Fragment>
                <JokeContent jokes={this.state.jokes} />
            </React.Fragment>
        );
    }

    render() {
        let content = this.state.loading
            ? <p><em>Loading Jokes... :)</em></p>
            : this.RenderJoke();

        return (
            <div>
                {content}
            </div>
        );
    }
}