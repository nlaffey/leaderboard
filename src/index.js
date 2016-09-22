import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Html from '../src/html/index.html';
import App from './components/App';
import favicon from './img/favicon.ico';

ReactDOM.render((<Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
</Router>), document.getElementById('app'));