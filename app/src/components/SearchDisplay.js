import React, { Component } from 'react';
import { connect } from 'react-redux';

import './searchDisplay.css'

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

      return (item["Function 1"].trim() === this.props.names[0].trim() || item["Function 2"].trim() === this.props.names[0].trim())
    }

    filterBod = (item) => {
      return (item["Body Zone 1"].trim() === this.props.names[1].trim() || item["Body Zone 2"].trim() === this.props.names[1].trim() || item["Body Zone 3"].trim() === this.props.names[1].trim())
    }

    filterFab = (item) => {
      return (item["Fabrication 1"].trim() === this.props.names[2] || item["Fabrication 2"].trim() === this.props.names[2].trim())
    }

    filterMat = (item) => {
      return (item["Material 1"].trim() === this.props.names[3].trim() || item["Material 2"].trim() === this.props.names[3].trim())
    }

    render() {

          let filterArr = [];

          if(this.props.params.includes('Function')) {
             filterArr = this.props.allData.filter(this.filterFunc);
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

          console.log(this.props.allData);
          console.log(filterArr);
          console.log(researchArr);
          console.log(tutorialsArr);
          console.log(aestheticsArr);
          console.log(conceptsArr);


            let searchItems = '';
          /*  searchItems = this.props.categories.map((listItem) => {
                 return (
                     <LeftPaneTab key={listItem} name={listItem} clicked={this.onClick} />
                 )
             });*/

            return (

             <div>
                {searchItems}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        allData: state.searchData,
        names: state.names,
        params: state.params
    }
};

export default connect(mapStateToProps)(SearchDisplay);