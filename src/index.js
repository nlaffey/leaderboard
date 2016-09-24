import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

// Views
import Leaderboard from './components/Content/Leaderboard';

// Static resources to be inserted by webkit in the bundle.js file. We don't reference these anywhere else.
import Html from './html/index.html';
import Favicon from './img/favicon.ico';
import Styles from './scss/style.scss';

// Frontend routing. We only have one route right now but I'll leave it in case we have more.
import App from './components/App';
ReactDOM.render((<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute components={Leaderboard}/>
        </Route>
    </Router>
), document.getElementById('app'));