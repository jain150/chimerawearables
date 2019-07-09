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

            let temp = googleData["Sheet1"].elements;

            let wearability = this.computeWearability(googleData["Wearability"].elements);

            for(let i = 0; i < temp.length; i++) {
                  temp[i] = {
                 ...temp[i],
                 Wearability: wearability[i]["Wearability"]
               };
            }
            this.props.updateSearchData(temp);


          },
          simpleSheet: false
        })

    }

    computeWearability = (wearability) => {

      wearability = wearability.map((item) => {

        let count = 0
        let totalCount = 50

        let attachScore = item["Attachment to the Body"];

        switch (attachScore) {

            case "Threads":
              attachScore = 5;
              break;
            case "Velcro":
              attachScore = 3;
              break;
            case "Adhesives":
               attachScore = 4;
              break;
            case "Embedded":
              attachScore = 2;
              break;
            case "Straps":
              attachScore = 1;
              break;
            case "Clips":
              attachScore = 4;
              break;
            default:
              attachScore = 0;
              totalCount = totalCount - 5;

        }

        let mainScore = item["Maintenance required"];

        if(isNaN(mainScore)) {
          totalCount = totalCount - 9;
        }

        else {

          count += parseInt(mainScore);
        }

        let actScore = item["activity obstruction"];

        if(isNaN(actScore)) {
          totalCount = totalCount - 9;
        }

        else {
          count += parseInt(actScore);
        }

        let intScore = item["Integration (form and size)"];

        if(isNaN(intScore)) {
          totalCount = totalCount - 9;
        }

        else {
          count += parseInt(intScore);
        }

        let conScore = item["Context"];

        if(isNaN(conScore)) {
          totalCount = totalCount - 9;
        }

        else {
          count += parseInt(conScore);
        }

        let aesScore = item["Aesthetics"];

        if(isNaN(aesScore)) {
          totalCount = totalCount - 9;
        }

        else {
          count += parseInt(aesScore);
        }

        //sum can be calculated by simple array iteration
        //total possible = 50 - SummaxofNAcolumns
        //percentage = sum / total possible

        return {"Wearability": ((count / totalCount) * 100).toFixed(2)}
      })

      return wearability;
    }

  displayMatrix = () => {
    this.setState({
      displayHome: false,
    });
  }

    render() {
        //console.log(store.getState());

        /*

          1) Wearability

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
