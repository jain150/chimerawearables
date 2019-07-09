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
            let costmetric = this.computeCostMetric(googleData["Sheet1"].elements);

            for(let i = 0; i < temp.length; i++) {
                  temp[i] = {
                 ...temp[i],
                 Wearability: wearability[i]["Wearability"],
                 costMetric: costmetric[i]["costMetric"]
               };
            }

            console.log(temp);
            this.props.updateSearchData(temp);
          },
          simpleSheet: false
        })

    }

    computeCostMetric = (data) => {

      let fabricationChart =
      {"Laser Cutting":	9,"3D Printing":	9,"Layering": 3,"Printing": 3,"Painting": 3,
      "Sticking": 1,"Heat Pressing": 9,"Heat Transfer": 3,"Soldering":	1,"Origami":	1,"Molding and Casting":	9,"Pleating and Folding": 3,
       "Knit": 1,"Embroidery and Applique":	3,
"Patchwork and Patterning": 3,"Woven": 9,"Non Woven":	9,
      "Machining":	9,"Cut and Sew":	1, "Joining": 3};


      /*
        INKS AND FINISHES
      */
      let materialChart =
      {
          "Conductive Inks": 3,
          "Polymers": 9,
          "Molding Materials": 9,
          "Threads": 1,
          "Conductive Threads":	3,
          "Adhesives": 3,
          "Paper and Cardboard": 1,
          "Electronics": 9,
          "Textiles and Composites": 1,
          "Hide":	1,
          "Hardware": 1,
          "Organic Materials": 9,
          "Inks & Finishes": 0,
          "Metal": 3,
          "Shape Memory Alloy": 9
      };

      let costMetric = [];


      for(let i = 0; i < data.length; i++) {

          let fabScore = 0;
          let matScore = 0;

          if(data[i]["Fabrication 1"] in fabricationChart) {
            fabScore = Math.max(fabScore, fabricationChart[data[i]["Fabrication 1"]]);
          }

          if(data[i]["Fabrication 2"] in fabricationChart) {
            fabScore = Math.max(fabScore, fabricationChart[data[i]["Fabrication 2"]]);
          }

          if(data[i]["Material 1"] in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 1"]]);
          }

          if(data[i]["Material 2"] in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 2"]]);
          }

          if(data[i]["Material 3"] in materialChart) {
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
