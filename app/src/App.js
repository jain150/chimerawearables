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
import { BrowserRouter, Route } from 'react-router-dom';

import * as actionTypes from './store/actions';

const SHEET_ID = '19SNEbgmJqzFkXajdTnCDN5S6-PHmqFIGoN_MCFeOMcc';
const ACCESS_TOKEN = 'AIzaSyBhtelk0uYpfhyFPHF6VRx9_V7AgFHTsNk';

class App extends Component {

    constructor() {
      super()
      this.state = {
        data: [],
        displayHome: true,
        viewCount: 0,
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
    async componentDidMount() {
        const sheet1Response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:AR807?key=${ACCESS_TOKEN}`,
        {
          headers: {
            "Content-Type": "application/json",
        }
        });
        const wearabilityResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Wearability!A1:J807?key=${ACCESS_TOKEN}`,
        {
          headers: {
            "Content-Type": "application/json",
        }
        });

        const sheet1Info = await sheet1Response.json()
        const wearabilityInfo = await wearabilityResponse.json()

        const sheet1ArrayData = sheet1Info["values"]
        const wearabilityArrayData = wearabilityInfo["values"]

        let sheet1Data = []
        let wearabilityData = []

        const sheet1Headers = sheet1ArrayData[0]
        for(let i = 1; i < sheet1ArrayData.length; i++) {
          let tempMap = {}
          let currentRow = sheet1ArrayData[i];
          for(let j = 0; j < currentRow.length; j++) {
            tempMap[sheet1Headers[j]] = currentRow[j]; 
          }
          sheet1Data.push(tempMap)
        }

        const wearabilityHeaders = wearabilityArrayData[0]
        for(let i = 1; i < wearabilityArrayData.length; i++) {
          let tempMap = {}
          let currentRow = wearabilityArrayData[i];
          for(let j = 0; j < currentRow.length; j++) {
            tempMap[wearabilityHeaders[j]] = currentRow[j]; 
          }
          wearabilityData.push(tempMap)
        }
        let costmetric = this.computeCostMetric(sheet1Data);
        let impMetric = this.computeImplementationMetric(sheet1Data);
        let wearability = this.computeWearability(wearabilityData);
        for(let i = 0; i < sheet1Data.length; i++) {
          sheet1Data[i] = {
              ...sheet1Data[i],
              Wearability: wearability[i]["Wearability"],
              costMetric: costmetric[i]["costMetric"],
              impMetric: impMetric[i]["impMetric"],
            };
        }
        this.props.updateSearchData(sheet1Data);
    }

    componentWillMount() {

      let updateViewCount = this.props.updateViewCount;
      let temp = 0;


              var request = new Request('https://chimerabackend.herokuapp.com/api/viewCounter/', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
              fetch(request).then(function(response){
                 if(response.status.toString() === '200') {
                    response.text().then(function(text) {
                        var objReceived = JSON.parse(text);
                        if (objReceived.message === 'SUCCESS') {
                          temp = 1;
                          updateViewCount(objReceived.counter)
                        }
                    })
                  }
              })

              if(temp = 0) {

                request = new Request('https://chimerabackend.herokuapp.com/api/viewCounter/', {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                fetch(request).then(function(response){
                   if(response.status.toString() === '200') {
                      response.text().then(function(text) {
                          var objReceived = JSON.parse(text);
                          if (objReceived.message === 'SUCCESS') {
                            temp = 1;
                            updateViewCount(objReceived.counter)
                          }
                      })
                    }
                })
              }

    }

    computeImplementationMetric = (data) => {

      let fabricationChart =
      {"laser cutting":	3,"3d printing":	9,"layering": 1,"printing": 3,"painting": 3,
      "sticking": 1,"heat pressing": 9,"heat transfer": 9,"soldering":	3,"origami":	1,"molding and casting":	9,"pleating and folding": 3,
       "knitting": 9,"embroidery and applique":	9,
       "patchwork and patterning": 3,"weaving": 3,"non woven":	3,
      "machining":	3,"cut and sew":	1, "joining": 1};

      let functionChart =
        {'storage': 1, 'breathability': 3, 'energy harvesting': 9, 'feeling/sensation/haptics': 9,
         'display': 3, 'electronic connections': 3, 'wireless communication': 9, 'movement': 3,
          'sensing': 3, 'protective': 1, 'magnetic': 1, 'cognitive': 9, 'modularity': 3, 'emissivity': 3,
        'wearability': 3, 'shape changing': 3, 'aesthetics': 3, 'gestures': 3, 'studies/reviews': 3, 'interfaces':3, 'skins':3, 'interactions/Control':3};

      let impMetric = [];

      for(let i = 0; i < data.length; i++) {

          let fabScore = 0;
          let funcScore = 0;

          if(data[i]["Fabrication 1"].toLowerCase() in fabricationChart) {
            fabScore += fabricationChart[data[i]["Fabrication 1"].toLowerCase()];
          }

          if(data[i]["Fabrication 2"].toLowerCase() in fabricationChart) {
            fabScore += fabricationChart[data[i]["Fabrication 2"].toLowerCase()];
          }

          if(data[i]["Function 1"].toLowerCase() in functionChart) {
            funcScore = Math.max(funcScore, functionChart[data[i]["Function 1"].toLowerCase()]);
          }

          if(data[i]["Function 2"].toLowerCase() in functionChart) {
            funcScore = Math.max(funcScore, functionChart[data[i]["Function 2"].toLowerCase()]);
          }

          if(data[i]["Function 3"].toLowerCase() in functionChart) {
            funcScore = Math.max(funcScore, functionChart[data[i]["Function 3"].toLowerCase()]);
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
       "knitting": 1,"embroidery and applique":	3,
       "patchwork and patterning": 3,"weaving": 9,"non woven":	9,
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
          "clips/Velcro/pins/zippers": 1,
          "Bio-materials/organic materials": 9,
          "inks & finishes": 0,
          "metal": 3,
          "shape memory alloy": 9
      };

      let costMetric = [];

      for(let i = 0; i < data.length; i++) {

          let fabScore = 0;
          let matScore = 0;

          if(data[i]["Fabrication 1"].toLowerCase() in fabricationChart) {
            fabScore = Math.max(fabScore, fabricationChart[data[i]["Fabrication 1"].toLowerCase()]);
          }

          if(data[i]["Fabrication 2"].toLowerCase() in fabricationChart) {
            fabScore = Math.max(fabScore, fabricationChart[data[i]["Fabrication 2"].toLowerCase()]);
          }

          if(data[i]["Material 1"].toLowerCase() in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 1"].toLowerCase()]);
          }

          if(data[i]["Material 2"].toLowerCase() in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 2"].toLowerCase()]);
          }

          if(data[i]["Material 3"].toLowerCase() in materialChart) {
            matScore = Math.max(matScore, materialChart[data[i]["Material 3"].toLowerCase()]);
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
          {(this.state.displayHome) ? (<HomePage toggle={this.toggleToSearch} />) : ((!this.props.searchDisplay) ? (<div className="layout" style={{
            width: window.innerWidth
          }}>
             <LeftPane />
             <BodyZones />
             <Matrix />
             
            <FilterPane toggleBack={this.toggleBack} move={false} showLoop={true} showView={true} views={this.state.viewCount} mainPage={true}/>
          </div>) : (<div className="layoutBlack"><SearchDisplay backToSearch={this.props.updateSearchDisplay}/>
          <FilterPane toggleMainDisplay={this.props.updateSearchDisplay} move={true} toggleBack={this.toggleBack} showView={false} views={this.state.viewCount} showLoop={true} mainPage={false}/>
        </div>)
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
        updateSearchDisplay: () => dispatch({type: actionTypes.REMOVE_SEARCH_DISPLAY}),
        updateViewCount:  (value) => dispatch({type: actionTypes.VIEW_COUNTER, val: value}),
        toggleMainDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
