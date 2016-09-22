import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="form-group">
            <label htmlFor={this.props.name}>{this.props.friendlyName}</label>
            <input id={this.props.name}
                   name={this.props.name}
                   value={this.props.value}
                   onChange={this.props.handleChange}/>
        </div>)
    }

}

export default Input;