import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/home.js';
import MovieDetails from './components/movie-details.js';
import './styles/index.css';
import './styles/typography.css';
import { Route, BrowserRouter, hashHistory, Redirect } from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter history={hashHistory}>
		<App>
      <Route exact={true} path="/" component={Home} />
      <Route path="/movie-details" component={MovieDetails} />
	  </App>
 	</BrowserRouter>
	),
  document.getElementById('root')
);
