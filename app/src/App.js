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

  /*

    For deepDisplay.

    Create single component, <SearchDisplay>. Put it in <App>

    Make a sub-component, re-use that 4 times, as page would be divided into 4 parts.

    Firstly, make a array in the store for this purpose. Might also make dummy arrays for the four search subtypes.

    Use css code from leftpanetab to make the lefttab.

    Then use dummy array data to populate cards and define a flex display and horizontal scroll.
  */


    constructor() {
      super()
      this.state = {
        data: []
      }
  }

    componentDidMount() {
    Tabletop.init({
      key: '1FeycGe3d6bEsAeXCnz1ov6G2yGsrD_PV2oMPZJ0hWtk',
      callback: googleData => {
        this.props.updateSearchData(googleData);
      },
      simpleSheet: true
    })

  }

    render() {
        //console.log(store.getState());


        return (
          <div>
          {(!this.props.searchDisplay) ? (<div className="layout">
             <LeftPane />
             <LeftPaneModal />
             <Matrix />
             <FilterPane />
          </div>) : (<SearchDisplay />)}
          </div>

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
