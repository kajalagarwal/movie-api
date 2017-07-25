import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/home.js';
import MovieDetails from './components/movie-details.js';
import './styles/index.css';
import './styles/typography.css';
import { Route, BrowserRouter, hashHistory } from 'react-router-dom';

ReactDOM.render((
	<BrowserRouter history={hashHistory}>
		<div>
			<App>
		    <Route path="/popular-movies" component={Home} />
		    <Route path="/movie-details" component={MovieDetails} />
		  </App>
	  </div>
 	</BrowserRouter>
	),
  document.getElementById('root')
);
