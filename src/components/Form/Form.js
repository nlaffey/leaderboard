import React from 'react';
import Input from './Input';
import $ from 'jquery';
import Spinner from './Spinner';
import errorMessages from '../../helpers/errorMessages';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personName: '',
            xhrProcessing: false,
            errorMessage: '',
            successMessage: '',
        }
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
                    successMessage: response.name + ' was added!',
                    personName: ''
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
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>{this.state.successMessage}</div>
                    <div>{this.state.errorMessage}</div>
                    <Input friendlyName="Name" name="personName" value={this.state.personName}
                           handleChange={this.handleChange.bind(this)}/>
                    <button type="submit">Submit</button>
                    <Spinner show={this.state.xhrProcessing}/>
                </form>
            </div>
        )
    }
}

export default Form;