import React from 'react';
import Input from './Input';
import $ from 'jquery';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {personName: ''};
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = this.state;
        $.post('/newPerson', data, function () {
            console.log('done');

        });
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
                    <Input name="personName" value={this.state.value} handleChange={this.handleChange.bind(this)}/>
                </form>
            </div>
        )
    }

}

export default Form;