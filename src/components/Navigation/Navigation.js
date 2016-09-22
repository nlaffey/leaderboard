import React from 'react';
import {Link} from 'react-router';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                <li><Link to="players">Players</Link></li>
                <li><Link to="newGame">New game</Link></li>
                <li><Link to="leaderBoard">Leaderboard</Link></li>
            </ul>

        );
    }
}

export default Navigation;
