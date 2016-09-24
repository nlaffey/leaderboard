import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className={'form-group ' + this.props.className}>
            <label htmlFor={this.props.name}>{this.props.friendlyName}</label>
            <input aria-invalid={this.props.ariaInvalid}
                   aria-described-by={this.props.formId}
                   id={this.props.name}
                   name={this.props.name}
                   value={this.props.value}
                   onChange={this.props.handleChange}
                   className="form-control"
                   minLength={this.props.minLength}
                   maxLength={this.props.maxLength}
                   required={this.props.required}/>
        </div>)
    }

}

export default Input;