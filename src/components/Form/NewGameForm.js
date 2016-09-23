import React from 'react';
import SelectPlayer from './SelectUser';
import $ from 'jquery';
import InputCheckbox from './InputCheckbox';
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

        this.id = 'newGameForm';

    }

    playerDoesNotExist(testee) {
        var matches = this.props.players.filter(function (player) {
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
            this.setState({[player2Err]: errors.SAME_PLAYER});
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
                result: this.state.playerTeam1WL,
            }, {
                name: this.state.playerTeam2,
                result: this.state.playerTeam2WL,
            }]
        }


        var xhr = $.post('/gameResults', data);

        xhr.done(function () {
            _this.setState({
                successMessage: 'New game added successfully.',
                playerTeam1: '',
                playerTeam2: '',
                playerTeam1WL: 'L',
                playerTeam2WL: 'L',
            });
            _this.props.handleUpdate();
        });

        xhr.fail(function () {
            // TODO: Error handling.
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

    handlePlayerChange(team, proxy, change) {
        this.setState({['playerTeam' + team]: change.newValue});
    }

    handleWinnerChange(team, event) {
        var checked = event.target.checked
        this.setState({playerTeam1WL: team == 1 && checked === true ? 'W' : 'L'});
        this.setState({playerTeam2WL: team == 2 && checked === true ? 'W' : 'L'});
    }

    renderMessage() {
        var success = this.state.successMessage;
        var error = this.state.errorMessage;
        if (error + success === '') return;
        var alertClass = success !== '' ? 'success' : 'danger';
        return (<div id={this.id + '-form-message'} className={'alert alert-' + alertClass}>
            {error || success}
        </div>)
    }


    render() {
        const team1 = 1;
        const team2 = 2;
        return (
            <div id="newGame">
                <h2>New game</h2>
                <form>
                    <SelectPlayer id="SelectPlayerTeam1"
                                  selectedPlayer={this.state.playerTeam1}
                                  players={this.props.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, team1)}
                                  errorMessage={this.state.playerTeam1ErrorMessage}/>

                    <InputCheckbox id="WinnerPlayerTeam1"
                                   friendlyName="Winner"
                                   handleChange={this.handleWinnerChange.bind(this, team1)}
                                   checked={this.state.playerTeam1WL === 'W'}/>
                    <div className="text-center">VERSUS</div>
                    <SelectPlayer id="SelectPlayerTeam2"
                                  selectedPlayer={this.state.playerTeam2}
                                  players={this.props.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, team2)}
                                  errorMessage={this.state.playerTeam2ErrorMessage}/>

                    <InputCheckbox id="WinnerPlayerTeam2"
                                   friendlyName="Winner"
                                   handleChange={this.handleWinnerChange.bind(this, team2)}
                                   checked={this.state.playerTeam2WL === 'W'}/>
                    <button className="btn btn-default"
                            onClick={this.handleSubmitForm.bind(this)}>Add game</button>
                    {this.renderMessage()}
                </form>
            </div>

        );
    }
}

export default NewGame;
