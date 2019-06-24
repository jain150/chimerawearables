import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import LeftPane from './components/LeftPane';
import Matrix from './components/Matrix';
import LeftPaneModal from './components/LeftPaneModal';
import SearchDisplay from './components/SearchDisplay';
import FilterPane from './components/FilterPane';
import Tabletop from 'tabletop';

import * as actionTypes from './store/actions';

class App extends Component {

    constructor() {
      super()
      this.state = {
        data: []
      }
  }

    componentDidMount() {
    Tabletop.init({
      key: '19SNEbgmJqzFkXajdTnCDN5S6-PHmqFIGoN_MCFeOMcc',
      callback: googleData => {
        this.props.updateSearchData(googleData);
      },
      simpleSheet: true
    })

  }

    render() {
        //console.log(store.getState());

        /*

          1) Finish work on filter
          2) Handle the bubble effects in the main UI display
          3) Make search case insensitive
          4) Create a list display for search results
          5) Make a search functionality
          6) Add icons
          7) In search display, add another column for patents
          8) Get UI up to spec

          9) Make filter reflect in the searchDisplay
          10) Fix the problem where modal should get closed by clicking anywhere on the page

          In terms of work,

          Inside search display, handle the two display types
        */
        return (
          <>
          {(!this.props.searchDisplay) ? (<div className="layout">
             <LeftPane />
             <LeftPaneModal />
             <Matrix />
             <FilterPane showLoop={true}/>
          </div>) : (<div className="layout"><SearchDisplay />
          <FilterPane showLoop={true}/></div>)}
          </>

    );
  }
}

const mapStateToProps = state => {
    return {
        searchDisplay: state.searchDisplay,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateSearchData: (value) => dispatch({type: actionTypes.UPDATE_DATA, value: value}),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
