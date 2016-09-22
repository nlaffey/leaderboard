import React from 'react';
import $ from 'jquery';

var NewPerson = React.createClass({

    getInitialState: function() {
        return {value: 'Hello!'};
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
        );
    }
});

module.exports = NewPerson;