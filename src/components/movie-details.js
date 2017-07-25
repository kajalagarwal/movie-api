import React, { Component } from 'react';
import '../styles/index.css';
import axios from 'axios';
import Reactable from 'reactable';

var Table = Reactable.Table;

export default class MovieDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieData: {}
    };
  }

  componentDidMount() {
    var movie_id = window.location.search.split("=")[1] || "119450"
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=5b19221d20b929615d236692cea743e4&language=en-US`)
    .then(response => {
      const movieData = response.data
      this.setState({ movieData })
    });
  }

  collectCategoriesName = (categories) => {
    return categories.map((data) => data.name)
  }

  collectData() {
    const { belongs_to_collection, genres, production_companies, production_countries, spoken_languages } = this.state.movieData;
    const {
      title,
      adult,
      budget,
      homepage,
      original_title: originalTitle,
      overview,
      popularity,
      release_date: releaseDate,
      revenue,
      status,
      vote_average: voteAverage,
      vote_count: voteCount,
    } = this.state.movieData;

    const { name: collectionName } = belongs_to_collection

    const genr = this.collectCategoriesName(genres);
    const productionCompanies = this.collectCategoriesName(production_companies);
    const productionCountries = this.collectCategoriesName(production_countries);
    const spokenLanguages = this.collectCategoriesName(spoken_languages);

    return [
      {Factor: "Adult", Description: adult},
      {Factor: "Budget", Description: budget},
      {Factor: "HomePage", Description:  homepage},
      {Factor: "Title", Description: title},
      {Factor: "Original Title", Description: originalTitle},
      {Factor: "OverView", Description: overview},
      {Factor: "Popularity", Description: popularity},
      {Factor: "Release Date", Description: releaseDate},
      {Factor: "Revenue", Description: revenue},
      {Factor: "Status", Description: status},
      {Factor: "Vote Average", Description: voteAverage},
      {Factor: "Vote count", Description: voteCount},
      {Factor: "Collection", Description: collectionName},
      {Factor: "Genres", Description: genr},
      {Factor: "Prod Companies", Description: productionCompanies},
      {Factor: "Prod Countries", Description: productionCountries},
      {Factor: "Language", Description: spokenLanguages}
    ]
  }

  renderTable = (data) => {
    return (
      (data) ? (
        <Table className="table" data={data} />
      ) : null
    )
  }

  render() {
    var data = Object.keys(this.state.movieData).length > 0 ? this.collectData() : null
    return (
      <div className='marginTop40'>
        <div className='smallHeadline darkCoralText marginBtm20'>Movie Details</div>
        {this.renderTable(data)}
      </div>
    );
  }
}
