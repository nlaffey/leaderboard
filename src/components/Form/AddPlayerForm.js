import React from 'react';
import Form from './Form';
import Input from './Input';
import $ from 'jquery';
import errorMessages from '../../helpers/errorMessages';


//TODO: Handle null inputs
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

    clearMessages() {
        this.setState({
            errorMessage: '',
            successMessage: '',
            xhrProcessing: true
        });
    }

    handleChange(event) {
        var state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
    }


    handleSubmit(event) {
        var _this = this;
        event.preventDefault();
        var data = this.state;

        this.clearMessages();
        var xhr = $.post('/addPlayer', data);

        xhr.done(function (response) {
            if (response.name) {
                _this.setState({
                    successMessage: response.name.trim() + ' was added!',
                    playerName: ''
                });
                _this.props.onSuccess();
            } else {
                _this.setState({errorMessage: errorMessages.UNKNOWN})
            }

        });

        xhr.fail(function (response) {
            var message = '';
            if (!response.responseJSON || !response.responseJSON.code) {
                _this.setState({errorMessage: errorMessages.UNKNOWN});
            }

            if (response.responseJSON.code === 11000) {
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
            <div>
                <Form id={this.formId} formState={this.state}
                      handleSubmitForm={this.handleSubmit.bind(this)}
                      handleChange={this.handleChange.bind(this)}>
                    <Input formId={this.formId} className={this.state.nameInvalid ? 'has-error' : ''}
                           ariaInvalid={this.state.nameInvalid}
                           friendlyName="Name" name="playerName"/>
                </Form>
            </div>
        );
    }
}

export default AddPlayerForm;
