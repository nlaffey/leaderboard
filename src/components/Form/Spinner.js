import React from 'react';
import ripple from '../../img/ripple.gif';

class Spinner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <img className={this.props.show ? '' : 'display-none'} src={ripple} alt="loading icon"/>
        );
    }
}

export default Spinner;
