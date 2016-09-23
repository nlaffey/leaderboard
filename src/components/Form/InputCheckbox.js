import React from 'react';

class InputCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>{this.props.errorMessage}</div>
                <div className="checkbox">
                    <label>
                        <input id={this.props.id} name={this.props.id} onChange={this.props.handleChange}
                               type="checkbox"
                               checked={this.props.checked}/>
                        {this.props.friendlyName}
                    </label>
                </div>
            </div>
        );
    }
}

export default InputCheckbox;
