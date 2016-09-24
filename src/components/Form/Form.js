import React from 'react';
import Spinner from './Spinner';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.props.handleSubmitForm;
    }


    // Allows us to pass down properties child elements.
    childrenWithProps() {
        var _this = this;
        return React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                handleChange: _this.props.handleChange.bind(_this),
                value: _this.props.formState[child.props.name]
            })
        });
    }

    renderMessage() {
        var success = this.props.formState.successMessage;
        var error = this.props.formState.errorMessage;
        if (error + success === '') return;
        var alertClass = success !== '' ? 'success' : 'danger';
        return (<div id={this.props.id + '-form-message'} className={'alert alert-' + alertClass}>
            {error || success}
        </div>)
    }

    render() {
        return (
            <div>
                <form id={this.props.id} onSubmit={this.props.handleSubmitForm.bind(this)}>
                    {this.childrenWithProps()}
                    <button className="btn btn-default" type="submit">{this.props.submitValue}</button>
                    <Spinner show={this.props.formState.xhrProcessing}/>
                    <br/>
                </form>
                {this.renderMessage()}
            </div>
        )
    }
}

export default Form;