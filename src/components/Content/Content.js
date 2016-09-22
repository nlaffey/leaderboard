import React from 'react';
import Form from '../Form/Form';

class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export default Content;
