import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           <input name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
        )
    }

}

export default Input;