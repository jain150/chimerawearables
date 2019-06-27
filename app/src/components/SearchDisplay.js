import React, { Component } from 'react';
import { connect } from 'react-redux';

import './searchDisplay.css'
import SearchDisplayTab from './SearchDisplayTab'
import ListDisplayTab from './ListDisplayTab'

import { Table } from 'reactstrap';

import * as actionTypes from '../store/actions';

class SearchDisplay extends Component {


  /*
    Have a list view control variable in state
  */
    constructor(props) {

        super(props);

        this.state = {

          filterData: [],
          research: [],
          tutorials: [],
          aesthetics: [],
          concepts: [],
          listView: false,
        };
    }

    filterFunc = (item) => {

      return (item["Function 1"].toLowerCase().trim().includes(this.props.names[0].toLowerCase().trim()) || item["Function 2"].toLowerCase().trim().includes(this.props.names[0].toLowerCase().trim()) || item["Function 3"].toLowerCase().trim().includes(this.props.names[0].toLowerCase().trim()))
    }

    filterBod = (item) => {
      return (item["Body Zone 1"].toLowerCase().trim().includes(this.props.names[1].toLowerCase().trim()) || item["Body Zone 2"].toLowerCase().trim().includes(this.props.names[1].toLowerCase().trim()) || item["Body Zone 3"].toLowerCase().trim().includes(this.props.names[1].toLowerCase().trim()))
    }

    filterFab = (item) => {
      return (item["Fabrication 1"].toLowerCase().trim().includes(this.props.names[2].toLowerCase().trim()) || item["Fabrication 2"].toLowerCase().trim().includes(this.props.names[2].toLowerCase().trim()))
    }

    filterMat = (item) => {
      return (item["Material 1"].toLowerCase().trim().includes(this.props.names[3].toLowerCase().trim()) || item["Material 2"].toLowerCase().trim().includes(this.props.names[3].toLowerCase().trim()) || item["Material 3"].toLowerCase().trim().includes(this.props.names[3].toLowerCase().trim()))
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

          console.log(filterArr);

          if(!this.props.searchDisplay) {

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
        }

        else {

            filterArr = filterArr.filter((item) => {
              return item["Reference Name"].toLowerCase().includes(this.props.searchQuery.toLowerCase());
          }

        );
        }

          let researchArr = [];
          let tutorialsArr = [];
          let aestheticsArr = [];
          let conceptsArr = [];
          let patentsArr = [];

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

          patentsArr = filterArr.filter((item) => {
            return item["Patents"].trim() === 'x'
          });


          let listView = this.props.listView;
          let i = 1;
          let listContents = filterArr.map((item) => {
            return (
              <tr>
                <th scope="row">{i++}</th>
                <td>{item["Reference Name"]}</td>
                <td>{item["Reference Link"]}</td>
              </tr>
            )
          })

          return (

            <div style={{width: "90vw"}}>
              {(listView) ? (<div className="listSearch">
              {/*
              <ListDisplayTab type='Research' arr={this.shuffleArray(researchArr)}/>
              <ListDisplayTab type='Tutorials' arr={this.shuffleArray(tutorialsArr)}/>
              <ListDisplayTab type='Aesthetics' arr={this.shuffleArray(aestheticsArr)}/>
              <ListDisplayTab type='Concepts' arr={this.shuffleArray(conceptsArr)}/>
              <ListDisplayTab type='Patents' arr={this.shuffleArray(patentsArr)}/>


            */}
            <Table striped>
            <thead>
              <th>#</th>
              <th>Reference Name</th>
              <th>Link</th>
            </thead>
            <tbody>
              {listContents}
            </tbody>
          </Table>
              </div>
             ) : (<div className="layoutSearch">
                 <SearchDisplayTab type='Research' arr={this.shuffleArray(researchArr)}/>
                 <SearchDisplayTab type='Tutorials' arr={this.shuffleArray(tutorialsArr)}/>
                 <SearchDisplayTab type='Aesthetics' arr={this.shuffleArray(aestheticsArr)}/>
                 <SearchDisplayTab type='Concepts' arr={this.shuffleArray(conceptsArr)}/>
                <SearchDisplayTab type='Patents' arr={this.shuffleArray(patentsArr)}/>
             </div>)}
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

        listView: state.listView,

        searchDisplay: state.searchTermDisplay,
        searchQuery: state.searchTermQuery,
    }
};

export default connect(mapStateToProps)(SearchDisplay);
