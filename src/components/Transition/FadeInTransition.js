import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class FadeInTransition extends React.Component {

    render() {
        return <ReactCSSTransitionGroup
            transitionName="fadein"
            transitionAppear={true}
            transitionAppearTimeout={10000}
            transitionEnterTimeout={10000}
            transitionLeaveTimeout={300}>
            {this.props.children}
        </ReactCSSTransitionGroup>
    }
}

export default FadeInTransition;

