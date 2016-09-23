import React from 'react';
import Autosuggest from 'react-autosuggest';

class SelectUser extends React.Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
        };

        this.theme = {
            container: 'autosuggest dropdown',
            containerOpen: 'dropdown open',
            input: 'form-control',
            suggestionsContainer: 'dropdown-menu',
            suggestion: '',
            suggestionFocused: 'active'
        };
    }

    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions(change) {
        const inputValue = change.value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : this.props.players.filter(function (item) {
            return item.name.toLowerCase().slice(0, inputLength) === inputValue
        });
    }

    // When suggestion is clicked, Autosuggest needs to populate the input field
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    // Render the suggestions
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion.name}</span>
        );
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested(value) {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested() {
        this.setState({
            suggestions: []
        });
    };

    render() {
        return (
            <div>
                <div>{this.props.errorMessage}</div>
                <label htmlFor={this.props.id}>Name</label>
                <Autosuggest theme={this.theme}
                             id={this.props.id}
                             suggestions={this.state.suggestions}
                             onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                             onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                             getSuggestionValue={this.getSuggestionValue}
                             renderSuggestion={this.renderSuggestion}
                             inputProps={{
                                 placeholder: 'Type a players name',
                                 value: this.props.selectedPlayer,
                                 onChange: this.props.handlePlayerChange
                             }}/>
            </div>
        );
    }
}

export default SelectUser;