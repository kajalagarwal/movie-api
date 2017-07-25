import React, { Component } from 'react';
import '../styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Reactable from 'reactable';
import ReactPaginate from 'react-paginate';

var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      pageCount: 0,
      searchQuery: "",
    };
  }

  fetchAllData = (page) => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5b19221d20b929615d236692cea743e4&page=${page}`)
    .then(response => {
      const popularMovies = response.data.results
      const pageCount = response.data.total_pages
      this.setState({ popularMovies, pageCount })
    });
  }

  componentDidMount() {
    this.fetchAllData('1')
  }

  handlePageClick = (data) => {
    this.fetchAllData(data.selected+1)
  };

  fetchRequiredColumn() {
    var data
    data = this.state.popularMovies.map(data =>
      [data.id, data.title, data.popularity, data.adult, data.release_date, data.vote_count, data.vote_average]
    )
    return data
  }

  showMovieDetails = (row) => {
    window.location.href = `/movie-details?movie_id=${row[0]}`
  }

  searchFromAll = () => {
    var query = this.state.searchQuery;

    if (query.length > 0) {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5b19221d20b929615d236692cea743e4&language=en-US&query=${query}`)
      .then(response => {
        const popularMovies = response.data.results
        const pageCount = response.data.total_pages
        this.setState({ popularMovies, pageCount })
      })
    }
    else{
      (this.fetchAllData('1'))
    }

  }

  renderTable() {
    return (
      <div>
        <div className='smallHeadline darkCoralText marginBtm20 text-center'>Popular Movies</div>
        <div className='pull-right lightCoralText' id="SearchAll">
          <label className='marginRight20'>SearchAll</label>
          <input
            placeholder='search in all pages'
            className='marginRight20 grayText'
            onChange={(e) => this.setState({searchQuery: e.target.value})}
          />
          <button onClick={this.searchFromAll} className='marginRight20'>Submit</button>
        </div>
        <div className='marginTop20 padding20'>
          <Table className="table"
            filterable={['Movie Id', 'Title', 'Popularity', 'Adult', 'Release Date', 'Vote Count', 'Vote Average']}
            noDataText="No matching records found"
            currentPage={1}
            sortable={true}
          >
            {
              this.fetchRequiredColumn().map(row => {
                return (
                  <Tr key={row[0]} onClick={() => this.showMovieDetails(row)}>
                    <Td column="Movie Id">{row[0]}</Td>
                    <Td column="Title">{row[1]}</Td>
                    <Td column="Popularity">{row[2]}</Td>
                    <Td column="Adult">{row[2]}</Td>
                    <Td column="Release Date">{row[4]}</Td>
                    <Td column="Vote Count">{row[5]}</Td>
                    <Td column="Vote Average">{row[6]}</Td>
                  </Tr>
                )
            })}
          </Table>
        </div>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="">...</a>}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    )
  }


  render() {
    return (
      <div className='row'>
        <div className='marginTop40 row'>
          <div className='col-md-12'>{this.renderTable()}</div>
        </div>
      </div>
    );
  }
}