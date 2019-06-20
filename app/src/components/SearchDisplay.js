import React, { Component } from 'react';
import { connect } from 'react-redux';

import './searchDisplay.css'
import SearchDisplayTab from './SearchDisplayTab'

import * as actionTypes from '../store/actions';

class SearchDisplay extends Component {


    constructor(props) {

        super(props);

        this.state = {

          filterData: [],
          research: [],
          tutorials: [],
          aesthetics: [],
          concepts: []
        };
    }

    filterFunc = (item) => {

      return (item["Function 1"].trim().includes(this.props.names[0].trim()) || item["Function 2"].trim().includes(this.props.names[0].trim()) || item["Function 3"].trim().includes(this.props.names[0].trim()))
    }

    filterBod = (item) => {
      return (item["Body Zone 1"].trim().includes(this.props.names[1].trim()) || item["Body Zone 2"].trim().includes(this.props.names[1].trim()) || item["Body Zone 3"].trim().includes(this.props.names[1].trim()))
    }

    filterFab = (item) => {
      return (item["Fabrication 1"].trim().includes(this.props.names[2].trim()) || item["Fabrication 2"].trim().includes(this.props.names[2].trim()))
    }

    filterMat = (item) => {
      return (item["Material 1"].trim().includes(this.props.names[3].trim()) || item["Material 2"].trim().includes(this.props.names[3].trim()) || item["Material 3"].trim().includes(this.props.names[3].trim()))
    }

    filterYear = (item) => {

      return (item["Year"] >= this.props.minYear && item["Year"] <= this.props.maxYear)
    }

    shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    render() {

          let filterArr = this.props.allData;

          if(this.props.filter) {

            filterArr = filterArr.filter(this.filterYear);
          }

          if(this.props.params.includes('Function')) {
             filterArr = filterArr.filter(this.filterFunc);
          }

          if(this.props.params.includes('BodyZones')) {
             filterArr = filterArr.filter(this.filterBod);
          }
          if(this.props.params.includes('Fabrication')) {
             filterArr = filterArr.filter(this.filterFab);
          }
          if(this.props.params.includes('Material')) {
             filterArr = filterArr.filter(this.filterMat);
          }

          let researchArr = [];
          let tutorialsArr = [];
          let aestheticsArr = [];
          let conceptsArr = [];

          researchArr = filterArr.filter((item) => {
            return item["Research"].trim() === 'x'
          });

          tutorialsArr = filterArr.filter((item) => {
            return item["Tutorial"].trim() === 'x'
          });

          aestheticsArr = filterArr.filter((item) => {
            return item["Aesthetic Approach"].trim() === 'x'
          });

          conceptsArr = filterArr.filter((item) => {
            return item["Design Concepts"].trim() === 'x'
          });


            return (

             <div className="layoutSearch">
                <SearchDisplayTab type='Research' arr={this.shuffleArray(researchArr)}/>
                <SearchDisplayTab type='Tutorials' arr={this.shuffleArray(tutorialsArr)}/>
                <SearchDisplayTab type='Aesthetics' arr={this.shuffleArray(aestheticsArr)}/>
                <SearchDisplayTab type='Concepts' arr={this.shuffleArray(conceptsArr)}/>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        allData: state.searchData,
        names: state.names,
        params: state.params,

        filter: state.filter,
        minYear: state.minYear,
        maxYear: state.maxYear,
    }
};

export default connect(mapStateToProps)(SearchDisplay);
