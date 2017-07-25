import React, { Component } from 'react';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  showPopularMovies() {
    window.location.href = "/";
  }

  render() {
    return (
      <div>
        <div className="app">
          <div className="appHeader">
            <h2 className="headline uppercase whiteText">Movie Collection</h2>
          </div>
          <button
            className='text-center marginTop20 btnCoral'
            onClick={this.showPopularMovies}
            id="popular-movies"
          >
            All Movie Collection
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
