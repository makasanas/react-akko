import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import promise from 'redux-promise';
import reducers from './reducers/index.js'

import CheckHeader from './common/CheckHeader';
import requireAuth from './authentication/requireAuth';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Catalog from './catalog/catalog';

const createStoreWithMiddleware = applyMiddleware(
	promise, thunk
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    	<Router history={browserHistory}>
			<Route path="/" component={CheckHeader}>
				<IndexRoute component={Login}/>	
				<Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
				<Route path="catalog" component={Catalog} onEnter={requireAuth}/>
			</Route>
		</Router>
  </Provider>
  , document.getElementById('root'));
			