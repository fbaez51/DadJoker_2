import React, { Component } from 'react';
import { Table } from 'reactstrap';
import face_neutral_image from '../images/face_neutral.png';
import face_smile_image from '../images/face_smile.png';
import face_funny_image from '../images/face_funny.png';
import icon_count from '../images/icon_count.png';
import icon_star from '../images/icon_star.png';
import '../css/TopJokes.css';

export class TopJokes extends Component {
    static displayName = TopJokes.name;

    constructor(props) {
        super(props);
        this.state = { topJokes: [], loading: true };

        this.FetchData = this.FetchData.bind(this);
        this.RenderTopJokes = this.RenderTopJokes.bind(this);
    }

    componentDidMount() {
        this.FetchData();
    }

    FetchData() {
        fetch('api/Joke/FetchTopJokes')
            .then(response => response.json())
            .then(data => {
                this.setState({ topJokes: data, loading: false });
            });
    }

    RenderTopJokes() {
        return (

            <div>
                <br/>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Top 15 Jokes</th>
                            <th><img class="face" src={face_funny_image} alt=":D" /></th>
                            <th><img class="face" src={face_smile_image} alt=":)" /></th>
                            <th><img class="face" src={face_neutral_image} alt=":|" /></th>
                            <th><img class="face" src={icon_count} alt="c" /></th>
                            <th><img class="face" src={icon_star} alt="s" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.topJokes.map((topJoke,index) =>
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{topJoke.question}
                                <br />
                                    <i>{topJoke.answer}</i>
                                </td>
                                <td>{topJoke.funny}</td>
                                <td>{topJoke.smile}</td>
                                <td>{topJoke.nuetral}</td>
                                <td>{topJoke.totalVotes}</td>
                                <td>{topJoke.totalScore}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>


            </div>
        );
    }
    

    render() {

        let content = this.state.loading
            ? <p><em></em></p>
            : this.RenderTopJokes();

        return (
            <div>
                {content}
            </div>
        );
    }
}
