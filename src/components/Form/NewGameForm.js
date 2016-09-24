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
            winner: '',
            loser: '',
            winnerErrorMessage: '',
            loserErrorMessage: '',
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

        var winner = this.state.winner;
        var loser = this.state.loser;
        var winnerErrorMessage = 'winnerErrorMessage';
        var loserErrorMessage = 'loserErrorMessage';

        if (winner == '' || loser == '') {
            return invalid = true;
        }

        if (this.playerDoesNotExist(winner)) {
            this.setState({[winnerErrorMessage]: errors.INVALID_NAME});
            invalid = true;
        }
        if (this.playerDoesNotExist(loser)) {
            this.setState({[loserErrorMessage]: errors.INVALID_NAME});
            invalid = true;
        }
        if (winner == loser) {
            this.setState({[loserErrorMessage]: errors.SAME_PLAYER});
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
            players: {
                winner: this.state.winner,
                loser: this.state.loser
            }
        }


        var xhr = $.post('/gameResults', data);

        xhr.done(function () {
            _this.setState({
                successMessage: 'New game added successfully.',
                winner: '',
                loser: '',
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
            loserErrorMessage: errors.EMPTY,
            winnerErrorMessage: errors.EMPTY,
            successMessage: '',
            errorMessage: '',
        });

    }

    handlePlayerChange(result, proxy, change) {
        this.setState({[result]: change.newValue});
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
        return (
            <div id="newGame" className="col-md-6">
                <h2>Add game</h2>
                <form>
                    <SelectPlayer id="SelectWinner"
                                  label="Winner"
                                  selectedPlayer={this.state.winner}
                                  players={this.props.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, 'winner')}
                                  errorMessage={this.state.winnerErrorMessage}/>
                    <SelectPlayer id="SelectLoser"
                                  label="Loser"
                                  selectedPlayer={this.state.loser}
                                  players={this.props.players}
                                  handlePlayerChange={this.handlePlayerChange.bind(this, 'loser')}
                                  errorMessage={this.state.loserErrorMessage}/>
                    <button className="btn btn-default"
                            onClick={this.handleSubmitForm.bind(this)}>Add game
                    </button>
                    {this.renderMessage()}
                </form>
            </div>

        );
    }
}

export default NewGame;
