import React, {Component, PropTypes} from 'react';
import Leaderboard from './Content/Leaderboard';

class App extends Component {

    render() {
        return (
            <div className="container">
                <Leaderboard/>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
