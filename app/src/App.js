import React, { Component } from 'react';
import './App.css';
import 'typeface-roboto';
import "react-awesome-popover/build/index.css";
import { connect } from 'react-redux';
import LeftPane from './components/LeftPane';
import Matrix from './components/Matrix';
import LeftPaneModal from './components/LeftPaneModal';
import SearchDisplay from './components/SearchDisplay';
import FilterPane from './components/FilterPane';
import BodyZones from './components/BodyZones';
import HomePage from './components/HomePage'
import Tabletop from 'tabletop';

import * as actionTypes from './store/actions';

class App extends Component {

    constructor() {
      super()
      this.state = {
        data: [],
        displayHome: true,
      }
  }

  toggleToSearch = () => {

    this.setState({
      displayHome: false,
    })
  }

    componentDidMount() {
    Tabletop.init({
      key: '19SNEbgmJqzFkXajdTnCDN5S6-PHmqFIGoN_MCFeOMcc',
      callback: googleData => {
        this.props.updateSearchData(googleData["Sheet1"].elements);

      },
      simpleSheet: false
    })

  }

  displayMatrix = () => {
    this.setState({
      displayHome: false,
    });
  }

    render() {
        //console.log(store.getState());

        /*


          1) Get UI up to spec

            a) Fix filter - Idk
            b) Fix searchBar - Idk

          3) Fix the problem where leftpanemodal should get closed by clicking anywhere on the page, also improve it's UI - Idk


          5) Fix the contribution display in the filter
          5) Designing contact us and contribute links
          6) React-Router
        */
        return (
          <>
          {(this.state.displayHome) ? (<HomePage toggle={this.toggleToSearch} />) : ((!this.props.searchDisplay) ? (<div className="layout">
             <LeftPane />
             <LeftPaneModal />
             <Matrix />
             <BodyZones />
             <FilterPane move={false} showLoop={true}/>
          </div>) : (<div className="layout"><SearchDisplay />
          <FilterPane move={true} showLoop={true}/></div>)
        )}

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
