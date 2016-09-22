import React, {Component, PropTypes,} from 'react';
import Navigation from '../Navigation/Navigation';

class Header extends Component {
    render() {
        return (
            <div>
                <h1> Leaderboard </h1>
                <Navigation/>
            </div>
        );
    }
}

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
