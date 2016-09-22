import React from 'react';

class InputCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
            <label>{this.props.friendlyName}</label>
            <input id={this.props.id} name={this.props.id} onChange={this.props.handleChange} type="checkbox"
                   checked={this.props.value}/>
                </span>
        );
    }
}

export default InputCheckbox;
