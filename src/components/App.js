import React, {Component, PropTypes} from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Leaderboard from './Content/Leaderboard';

class App extends Component {

    render() {
        return (
            <div>
                <Header/>
                <Leaderboard/>
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
