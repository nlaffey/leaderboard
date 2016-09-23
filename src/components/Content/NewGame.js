import React from 'react';
import SelectPlayer from '../Form/SelectUser';
import $ from 'jquery';
import InputCheckbox from '../Form/InputCheckbox';
import errors from '../../helpers/errorMessages';

class NewGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [],
            playerTeam1: '',
            playerTeam2: '',
            playerTeam1WL: 'L',
            playerTeam2WL: 'L',
            playerTeam1ErrorMessage: '',
            playerTeam2ErrorMessage: '',
            successMessage: '',
            errorMessage: '',
        }
    }

    componentDidMount() {
        this.getPlayers();
    }

    playerDoesNotExist(testee) {
        var matches = this.state.players.filter(function (player) {
            return player.name == testee;
        });

        return matches.length < 1;
    }

    // Form validation
    formInvalid() {
        var invalid = false;

        var player1 = this.state.playerTeam1;
        var player2 = this.state.playerTeam2;
        var player1Err = 'playerTeam1ErrorMessage';
        var player2Err = 'playerTeam2ErrorMessage';

        if (player1 == '' || player2 == '') {
            return invalid = true;
        }

        if (this.playerDoesNotExist(player1)) {
            this.setState({[player1Err]: errors.INVALID_NAME});
            invalid = true;
        }
        if (this.playerDoesNotExist(player2)) {
            this.setState({[player2Err]: errors.INVALID_NAME});
            invalid = true;
        }
        if (player1 == player2) {
            this.setState({[player2Err]: errors.SAME_PERSON});
            invalid = true;
        }
        if (this.state.playerTeam1WL + this.state.playerTeam2WL == 'LL') {
            this.setState({[player1Err]: errors.NO_WINNER});
            invalid = true;
        }
        return invalid;
    }

    handleSubmitForm(event) {
        var _this = this;
        event.preventDefault();
        this.clearMessages();

        if (this.formInvalid()) return;

        var data = {
            players: [{
                name: this.state.playerTeam1,
                result: this.state.playerTeam1WL ? 'W' : 'L'
            }, {
                name: this.state.playerTeam2,
                result: this.state.playerTeam2WL ? 'W' : 'L'
            }]
        }


        var xhr = $.post('/gameResults', data);

        xhr.done(function () {
            _this.setState({
                successMessage: 'New results added successfully.',
                playerTeam1: '',
                playerTeam2: '',
                playerTeam1WL: 'L',
                playerTeam2WL: 'L',
            });
        });

        xhr.fail(function (err) {
            _this.setState({
                errorMessage: errors.UNKNOWN,
            });
        });

        xhr.always(function () {

        });

    }

    clearMessages() {
        this.setState({
            playerTeam2ErrorMessage: errors.EMPTY,
            playerTeam1ErrorMessage: errors.EMPTY,
            successMessage: '',
            errorMessage: '',
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
            _this.setState({errorMessage: errorMessages.UNKNOWN})
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
        this.setState({playerTeam1WL: team == 1 && checked === true ? 'W' : 'L'});
        this.setState({playerTeam2WL: team == 2 && checked === true ? 'W' : 'L'});
    }

    render() {
        const team1 = 1;
        const team2 = 2;
        return (
            <div>
                <h2>Enter new game information below</h2>
                <form>
                    <h3>Team 1</h3>
                    <SelectPlayer id="SelectPlayerTeam1"
                                  selectedPlayer={this.state.playerTeam1}
                                  players={this.state.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, team1)}
                                  errorMessage={this.state.playerTeam1ErrorMessage}/>

                    <InputCheckbox id="WinnerPlayerTeam1"
                                   friendlyName="Winner"
                                   handleChange={this.handleWinnerChange.bind(this, team1)}
                                   checked={this.state.playerTeam1WL === 'W'}/>
                    <div> VS</div>
                    <h3>Team 2</h3>
                    <SelectPlayer id="SelectPlayerTeam2"
                                  selectedPlayer={this.state.playerTeam2}
                                  players={this.state.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, team2)}
                                  errorMessage={this.state.playerTeam2ErrorMessage}/>

                    <InputCheckbox id="WinnerPlayerTeam2"
                                   friendlyName="Winner"
                                   handleChange={this.handleWinnerChange.bind(this, team2)}
                                   checked={this.state.playerTeam2WL === 'W'}/>
                    <button onClick={this.handleSubmitForm.bind(this)}>Submit</button>
                    <div>{this.state.successMessage}</div>
                    <div>{this.state.errorMessage}</div>
                </form>
            </div>

        );
    }
}

export default NewGame;
