import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import LeftPane from './components/LeftPane';
import Matrix from './components/Matrix';
import LeftPaneModal from './components/LeftPaneModal';
import SearchDisplay from './components/SearchDisplay';
import FilterPane from './components/FilterPane';
import BodyZones from './components/BodyZones';
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


          1) Get UI up to spec

            a) Fix filter - Idk
            b) Fix searchBar - Idk
            c) Fix searchDisplay UI - Quick
            d) Fix listDisplay UI - Quick

          2) Make filter reflect in the searchDisplay, DO THIS SHIT ASAP - Quick

          3) Fix the problem where leftpanemodal should get closed by clicking anywhere on the page, also improve it's UI - Idk

          4) Design the homepage - Quick


          5) Designing contact us and contribute links

          6) React-Router
        */
        return (
          <>
          {(!this.props.searchDisplay) ? (<div className="layout">
             <LeftPane />
             <LeftPaneModal />
             <Matrix />
             <BodyZones />
             <FilterPane move={false} showLoop={true}/>
          </div>) : (<div className="layout"><SearchDisplay />
          <FilterPane move={true} showLoop={true}/></div>)}
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
