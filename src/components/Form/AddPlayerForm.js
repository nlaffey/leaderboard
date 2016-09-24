import React from 'react';
import Form from './Form';
import Input from './Input';
import $ from 'jquery';
import errorMessages from '../../helpers/errorMessages';

class AddPlayerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerName: '',
            xhrProcessing: false,
            errorMessage: '',
            successMessage: '',
            nameInvalid: false,
        }

        this.formId = 'AddPlayerForm';
    }

    clearMessagesAndErrors() {
        this.setState({
            errorMessage: '',
            successMessage: '',
            xhrProcessing: false,
            nameInvalid: false
        });
    }

    handleChange(event) {
        var state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }


    handleSubmit(event) {
        event.preventDefault();
        var _this = this,
            playerName = this.state.playerName;
        this.clearMessagesAndErrors();

        if (this.state.playerName == '') {
            this.setState({errorMessage: errorMessages.NO_NAME_ENTERED})
            return;
        }

        this.setState({xhrProcessing: true});
        var xhr = $.post('/addPlayer', {playerName: this.state.playerName});

        xhr.done(function () {
            _this.setState({
                successMessage: playerName + ' was added!',
                playerName: ''
            });
            _this.props.onSuccess();
        });

        xhr.fail(function (response) {
            debugger;
            var message = '';
            if (!response.responseJSON || !response.responseJSON.error || !response.responseJSON.error.code) {
                _this.setState({errorMessage: errorMessages.UNKNOWN});
            }

            if (response.responseJSON.error.code === 11000) {
                message = errorMessages.UNIQUE_NAME;
                _this.setState({nameInvalid: true});

            } else {
                message = errorMessages.UNKNOWN;
            }
            _this.setState({errorMessage: message});

        });

        xhr.always(function () {
            _this.setState({xhrProcessing: false});
        })
    }


    render() {
        return (
            // Passing down the entire state here might be overkill, but I don't see the harm right now.
            <div id="addPlayerForm">
                <h2>Add player</h2>
                <Form id={this.formId} formState={this.state}
                      handleSubmitForm={this.handleSubmit.bind(this)}
                      handleChange={this.handleChange.bind(this)}
                      submitValue="Add player">
                    <Input formId={this.formId}
                           className={this.state.nameInvalid ? 'has-error' : ''}
                           ariaInvalid={this.state.nameInvalid}
                           friendlyName="Name"
                           name="playerName"
                           maxLength="50"
                           minLength="2"
                           required={true}
                           placeholder="Enter new players name"
                    />
                </Form>
            </div>
        );
    }
}

export default AddPlayerForm;
