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
import { Button, Fade } from 'reactstrap';
import Tabletop from 'tabletop';
import { BrowserRouter, Route } from 'react-router-dom';

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

  toggleBack = () => {

    this.setState({
      displayHome: true,
    })
  }

/*
    1) Create a modal for login when start is clicked
    2) Make a state variable, isLoggen in, only display bookmark related features if user is indeed logged in
*/
    componentDidMount() {

        Tabletop.init({
          key: '19SNEbgmJqzFkXajdTnCDN5S6-PHmqFIGoN_MCFeOMcc',
          callback: googleData => {

            let temp = googleData["Sheet1"].elements;

            let wearability = this.computeWearability(googleData["Wearability"].elements);
            let costmetric = this.computeCostMetric(googleData["Sheet1"].elements);
            let impMetric = this.computeImplementationMetric(googleData["Sheet1"].elements);
            for(let i = 0; i < temp.length; i++) {
                  temp[i] = {
                 ...temp[i],
                 Wearability: wearability[i]["Wearability"],
                 costMetric: costmetric[i]["costMetric"],
                 impMetric: impMetric[i]["impMetric"],
               };
            }

            console.log(temp);
            this.props.updateSearchData(temp);
          },
          simpleSheet: false
        })

    }

    computeImplementationMetric = (data) => {

      let fabricationChart =
      {"laser cutting":	3,"3d printing":	9,"layering": 1,"printing": 3,"painting": 3,
      "sticking": 1,"heat pressing": 9,"heat transfer": 9,"soldering":	3,"origami":	1,"molding and casting":	9,"pleating and folding": 3,
       "knit": 9,"embroidery and applique":	9,
       "patchwork and patterning": 3,"woven": 3,"non woven":	3,
      "machining":	3,"cut and sew":	1, "joining": 1};

      let functionChart =
        {'storage': 1, 'breathability': 3, 'energy harvesting': 9, 'feedback': 9,
         'display': 3, 'electronic elements connections': 3, 'wireless communication': 9, 'control': 9, 'movement': 3,
          'sensing': 3, 'protective': 1, 'magnetic': 1, 'cognitive': 9, 'modularity': 3, 'emissivity': 3,
        'wearability': 3, 'morphology': 3, 'aesthetics': 3, 'gestures': 3};

      let impMetric = [];

      for(let i = 0; i < data.length; i++) {

          let fabScore = 0;
          let funcScore = 0;

          if(data[i]["Fabrication 1"].toLowerCase() in fabricationChart) {
            fabScore += fabricationChart[data[i]["Fabrication 1"]];
          }

          if(data[i]["Fabrication 2"].toLowerCase() in fabricationChart) {
            fabScore += fabricationChart[data[i]["Fabrication 2"]];
          }

          if(data[i]["Function 1"].toLowerCase() in functionChart) {
            funcScore = Math.max(funcScore, functionChart[data[i]["Function 1"]]);
          }

          if(data[i]["Function 2"].toLowerCase() in functionChart) {
            funcScore = Math.max(funcScore, functionChart[data[i]["Function 2"]]);
          }

          if(data[i]["Function 3"].toLowerCase() in functionChart) {
            funcScore = Math.max(funcScore, functionChart[data[i]["Function 3"]]);
          }

          let temp = fabScore * funcScore;

          let ans = 1;
          if(temp <= 12)
            ans = 1;
          else if(temp > 12 && temp < 54)
            ans = 2;
          else {
            ans = 3;
          }

          impMetric[i] = {"impMetric": ans};
      }


      return impMetric;


  }

    computeCostMetric = (data) => {

      let fabricationChart =
      {"laser cutting":	9,"3d printing":	9,"layering": 3,"printing": 3,"painting": 3,
      "sticking": 1,"heat pressing": 9,"heat transfer": 3,"soldering":	1,"origami":	1,"molding and casting":	9,"pleating and folding": 3,
       "knit": 1,"embroidery and applique":	3,
       "patchwork and patterning": 3,"woven": 9,"non woven":	9,
       "machining":	9,"cut and wew":	1, "joining": 3};


      /*
        INKS AND FINISHES
      */
      let materialChart =
      {
          "conductive inks": 3,
          "polymers": 9,
          "molding materials": 9,
          "threads": 1,
          "conductive threads":	3,
          "adhesives": 3,
          "paper and cardboard": 1,
          "electronics": 9,
          "textiles and composites": 1,
          "hide":	1,
          "hardware": 1,
          "organic materials": 9,
          "inks & finishes": 0,
          "metal": 3,
          "shape memory alloy": 9
      };

      let costMetric = [];

      for(let i = 0; i < data.length; i++) {

          let fabScore = 0;
          let matScore = 0;

          if(data[i]["Fabrication 1"].toLowerCase() in fabricationChart) {
            fabScore = Math.max(fabScore, fabricationChart[data[i]["Fabrication 1"]]);
          }

          if(data[i]["Fabrication 2"].toLowerCase() in fabricationChart) {
            fabScore = Math.max(fabScore, fabricationChart[data[i]["Fabrication 2"]]);
          }

          if(data[i]["Material 1"].toLowerCase() in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 1"]]);
          }

          if(data[i]["Material 2"].toLowerCase() in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 2"]]);
          }

          if(data[i]["Material 3"].toLowerCase() in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 3"]]);
          }

          costMetric[i] = {"costMetric": fabScore + matScore};
      }
      return costMetric;
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

        return (
          <BrowserRouter>
          {(this.state.displayHome) ? (<HomePage toggle={this.toggleToSearch} />) : ((!this.props.searchDisplay) ? (<div className="layout">
             <LeftPane />
             <LeftPaneModal />
             <Matrix />
             <BodyZones />
             <FilterPane move={false} showLoop={true}/>
          </div>) : (<div className="layout"><SearchDisplay backToSearch={this.props.updateSearchDisplay}/>
          <FilterPane move={true} showLoop={true}/></div>)
        )}
        </BrowserRouter>

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
        updateSearchDisplay: () => dispatch({type: actionTypes.REMOVE_SEARCH_DISPLAY})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
