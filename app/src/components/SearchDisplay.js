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

      if(item["Year"] === "")
        return true
      return (item["Year"] >= this.props.minYear && item["Year"] <= this.props.maxYear)
    }

    filterVenue = (item) => {

      return (this.props.venue === 'All' || item["Conference (VENUE)"].toLowerCase() === this.props.venue.toLowerCase())
    }

    filterSource = (item) => {

            if(item["Source"] === "" || item["Source"] === "Both")
              return true

            return (this.props.source === 'Both' || item["Source"].toLowerCase() === this.props.source.toLowerCase())
    }

    shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(this.random(i) * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }

      return array;
    }

    random = (seed) => {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    render() {

            let filterArr = this.props.allData;

            if(!this.props.viewBookmarks) {
                  if(!this.props.searchDisplay) {


                          if(this.props.filter) {

                            filterArr = filterArr.filter(this.filterYear);
                            filterArr = filterArr.filter(this.filterVenue);
                            filterArr = filterArr.filter(this.filterSource);
                          }
                            console.log(filterArr);

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
                  });
                }


          }


          else {

            filterArr = filterArr.filter((item) => {

              return this.props.bookMarks.includes(item["Reference Link"].substring(10));
            });

          }

          this.props.filteredArrayUpdate(filterArr);

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

          let corLabel = "Pinned/Bookmarks";

          if(!this.props.viewBookmarks) {

            corLabel = "";
            if(this.props.params.includes('Function'))
              if(corLabel === "")
                corLabel = corLabel + this.props.names[0];
              else {
                corLabel = corLabel + ' + ' + this.props.names[0];
              }

            if(this.props.params.includes('BodyZones'))
              if(corLabel === "")
                corLabel = corLabel + this.props.names[1];
              else {
                corLabel = corLabel + ' + ' + this.props.names[1];
              }

            if(this.props.params.includes('Fabrication'))
              if(corLabel === "")
                corLabel = corLabel + this.props.names[2];
              else {
                corLabel = corLabel + ' + '  + this.props.names[2];
              }

            if(this.props.params.includes('Material'))
              if(corLabel === "")
                corLabel = corLabel + this.props.names[3];
              else {
                corLabel = corLabel + ' + ' + this.props.names[3];
              }
          }


          return (

            <div style={{width: "92.5%"}}>
              {(listView) ? (<div className="listSearch">
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
             ) : (
               <div className="layoutSearch">
                     <div className="bottomBar">
                       <div onClick={this.props.backToSearch} className="backLabel">
                           <div style={{height: "50%",fontSize: "120%", padding: "1% 0"}}>{"<---- Go Back to Search"}</div>
                       </div>
                       <div className="corLabel">
                           <div style={{height: "50%", fontSize: "120%", padding: "1% 0"}}>{corLabel}</div>
                       </div>
                     </div>
                     <SearchDisplayTab count="0" type='Research' arr={this.shuffleArray(researchArr)}/>
                     <SearchDisplayTab count="1" type='Tutorials' arr={this.shuffleArray(tutorialsArr)}/>
                     <SearchDisplayTab count="2" type='Aesthetics' arr={this.shuffleArray(aestheticsArr)}/>
                     <SearchDisplayTab count="3" type='Concepts' arr={this.shuffleArray(conceptsArr)}/>
                    <SearchDisplayTab count="4" type='Patents' arr={this.shuffleArray(patentsArr)}/>

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
        venue: state.venueFilter,
        source: state.sourceFilter,

        listView: state.listView,

        searchDisplay: state.searchTermDisplay,
        searchQuery: state.searchTermQuery,

        viewBookmarks: state.viewBookmarks,
        bookMarks: state.bookMarks,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        filteredArrayUpdate: (value) => dispatch({type: actionTypes.STORE_FILTERED_ARRAY, val: value}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);
