import React from 'react';
import SelectPlayer from '../Form/SelectUser';
import $ from 'jquery';
import InputCheckbox from '../Form/InputCheckbox';

class NewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            playerTeam1: '',
            playerTeam2: '',
            playerTeam1Winner: false,
            playerTeam2Winner: false,
            successMessage: '',
            errorMessage: ''
        }
    }

    componentDidMount() {
        this.getPlayers();
    }

    handleSubmitForm(event) {
        event.preventDefault();
        var data = {
            players: [{
                name: this.state.playerTeam1,
                win: this.state.playerTeam1Winner
            }, {
                name: this.state.playerTeam2,
                win: this.state.playerTeam2Winner
            }]
        }

        var xhr = $.post('/gameResults', data);

        xhr.done(function () {

        });

        xhr.fail(function () {

        });

        xhr.always(function () {

        });

    }


    // TODO: Not DRY
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

    handlePlayerChange(team, proxy, change) {
        this.setState({['playerTeam' + team]: change.newValue});
    }

    handleWinnerChange(team, event) {
        var checked = event.target.checked
        this.setState({playerTeam1Winner: team == 1 && checked === true});
        this.setState({playerTeam2Winner: team == 2 && checked === true});
    }


    render() {
        return (
            <div>
                <h2>Enter new game information below</h2>
                <form onSubmit={this.handleSubmitForm.bind(this)}>
                    <h3>Team 1</h3>
                    <SelectPlayer id="SelectPlayerTeam1"
                                  selectedPlayer={this.state.playerTeam1}
                                  players={this.state.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, 1)}/>

                    <InputCheckbox id="WinnerPlayerTeam1"
                                   friendlyName="Winner"
                                   handleChange={this.handleWinnerChange.bind(this, 1)}
                                   value={this.state.playerTeam1Winner}/>
                    <div> VS</div>
                    <h3>Team 2</h3>
                    <InputCheckbox id="WinnerPlayerTeam2"
                                   friendlyName="Winner"
                                   handleChange={this.handleWinnerChange.bind(this, 2)}
                                   value={this.state.playerTeam2Winner}/>
                    <SelectPlayer id="SelectPlayerTeam2"
                                  selectedPlayer={this.state.playerTeam2}
                                  players={this.state.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, 2)}/>
                    <button type="submit">Submit</button>
                </form>
            </div>

        );
    }
}

export default NewGame;
