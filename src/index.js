import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

// Views
import Leaderboard from './components/Content/Leaderboard';
import Players from './components/Content/Players';
import NewGame from './components/Content/NewGame';

// Static resources to be inserted by webkit in the bundle.js file. We don't reference these anywhere else.
import Html from '../src/html/index.html';
import favicon from './img/favicon.ico';
import Styles from './scss/style.scss';

// Frontend routing
import App from './components/App';
ReactDOM.render((<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute components={Leaderboard}/>
            <Route path="/leaderBoard" component={Leaderboard}/>
            <Route path="/players" component={Players}/>
            <Route path="/newGame" component={NewGame}/>
        </Route>
    </Router>
), document.getElementById('app'));