import React from 'react';
import Input from './Input';
import $ from 'jquery';
import Spinner from './Spinner';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            personName: '',
            xhrProcessing: false,
            errorMessage: '',
            successMessage: '',
        }

        this.ERROR_UNKNOWN = 'Something went wrong... why don\'t you debug it?';
    }

    clearMessages() {
        this.setState({
            errorMessage: '',
            successMessage: '',
            xhrProcessing: true
        });
    }

    handleSubmit(event) {
        var _this = this;
        event.preventDefault();
        var data = this.state;

        this.clearMessages();
        var xhr = $.post('/addPerson', data);

        xhr.done(function (response) {
            if (response.name) {
                _this.setState({
                    successMessage: response.name + ' was added!',
                    personName: ''
                });
            } else {
                _this.setState({errorMessage: _this.ERROR_UNKNOWN})
            }

        });

        xhr.fail(function (response) {
            var message = '';
            if (!response.responseJSON || !response.responseJSON.code) {
                _this.setState({errorMessage: _this.ERROR_UNKNOWN});
            }

            if (response.responseJSON.code === 11000) {
                message = 'That name already exists. Choose something a little more... unique?'
            } else {
                message = _this.ERROR_UNKNOWN
            }
            _this.setState({errorMessage: message});

        });

        xhr.always(function () {
            _this.setState({xhrProcessing: false});
        })
    }

    handleChange(event) {
        var state = {};
        state[event.target.name] = event.target.value;
        this.setState(state);
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