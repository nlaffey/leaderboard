import React from 'react';
import Results from './Results';
import $ from 'jquery';
import Players from './Players';
import NewGameForm from '../Form/NewGameForm';
import FadeInTransition from '../Transition/FadeInTransition'
import errorMessages from '../../helpers/errorMessages';
import AddPlayerForm from '../Form/AddPlayerForm';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            players: [],
        }
    }

    getResults() {
        var _this = this;
        var xhr = $.get('/gameResults');
        xhr.done(function (results) {
            _this.setState({results: results});
        });

        xhr.fail(function () {
            debugger;
        });

        xhr.always(function () {
        });
    }

    getPlayers() {
        var _this = this;
        this.setState({xhrProcessing: true});
        var xhr = $.get('/getPlayers');

        xhr.done(function (data) {
            // TODO: Error handling here. What else can come back?
            _this.setState({players: data});
        });

        xhr.fail(function () {
            _this.setState('errorMessage', errorMessages.UNKNOWN)
        });

        xhr.always(function () {
            _this.setState({xhrProcessing: false});
        });
    }


    handleUpdate() {
        this.getPlayers();
        this.getResults();
    }

    componentDidMount() {
        this.handleUpdate();
    }

    render() {
        return (
            <FadeInTransition>
                <h1 className="text-center"> Leaderboard </h1>
                <div key="leaderboard" id="leaderboard" className="col-md-12">
                    <Players key="players" players={this.state.players} handleUpdate={this.handleUpdate.bind(this)}/>
                    <Results key="results" results={this.state.results}/>

                    <AddPlayerForm onSuccess={this.handleUpdate.bind(this)}/>

                    <NewGameForm key="newgame" players={this.state.players}
                                 handleUpdate={this.handleUpdate.bind(this)}/>

                </div>
            </FadeInTransition>
        );
    }
}

export default Leaderboard;
