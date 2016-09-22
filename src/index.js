import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

// Static resources to be inserted by webkit in the bundle.js file. We don't reference these anywhere else.
import Html from '../src/html/index.html';
import favicon from './img/favicon.ico';
import Styles from './scss/style.scss';

// Frontend routing is handled here.
import App from './components/App';
ReactDOM.render((<Router history={hashHistory}>
    <Route path="/" component={App}>
    </Route>
</Router>), document.getElementById('app'));