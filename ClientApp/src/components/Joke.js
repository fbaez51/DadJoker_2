import React, { Component } from 'react';
import JokeContent from '../sub_components/JokeContent.js'

export class Joke extends Component {
    static displayName = Joke.name;

    constructor(props) {
        super(props);
        this.state = { jokes: [], loading: true }; //4 Max columns, need to adjust css if change is wanted.
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

        //alert(this.state.loading);

        //alert(this.state.jokes);
        //  alert("Fetch" + this.props.location.petID);
        //  this.setState({ currentPetID: this.props.location.petID })
    }

    RenderJoke(jokes) {
        return (
            <React.Fragment>
                <JokeContent jokes={this.state.jokes} />
            </React.Fragment>
        );
    }

    //         {
    //    jokes.map(j =>
    //        <div>
    //            <div> {j.jokeID} </div>
    //            <div> {j.question} </div>
    //            <div> {j.answer} </div>
    //        </div>
    //    )
    //}

    render() {
        let content = this.state.loading
            ? <p><em>Loading Jokes... :)</em></p>
            : this.RenderJoke(this.state.jokes);

        //alert(this.state.jokes);
        return (
            <div>
                {content}
            </div>
        );
    }
}
