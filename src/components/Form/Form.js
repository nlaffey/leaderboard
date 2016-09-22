import React from 'react';
import Input from './Input';
import $ from 'jquery';
import Spinner from './Spinner';
import errorMessages from '../../helpers/errorMessages';

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

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmitForm.bind(this)}>
                    <div>{this.props.formState.successMessage}</div>
                    <div>{this.props.formState.errorMessage}</div>
                    {this.childrenWithProps()}
                    <button type="submit">Submit</button>
                    <Spinner show={this.props.formState.xhrProcessing}/>
                </form>
            </div>
        )
    }
}

export default Form;