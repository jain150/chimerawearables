import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'rc-slider/assets/index.css';
import './filterBody.css'
import Slider from 'rc-slider';
import * as actionTypes from '.././store/actions';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { ButtonDropdown, Progress, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import ColCharts from './ColCharts'
import BodyChart from './BodyChart'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Label } from 'semantic-ui-react'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = Slider.Range;

class FilterBody extends Component {

    constructor(props) {
          super(props);



        this.toggle = this.toggle.bind(this);
          this.state = {
            dropdownOpen: false,
            venue: 'All',
            modal: false,
            showLabels: true,

            sourceInit: 0,
          };
    }

    toggleStats = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));

      this.props.filterToggle();

    }

    toggle() {

      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen,
        showLabels: !prevState.showLabels
      }));
   }

     onChange = (value) => {

       console.log(value[1]);

      this.props.filterData();
      this.props.filterYear(value[0], value[1]);
    }

    onVenueClick = (value) => {

      this.setState({
        venue: value,
      });

      this.props.filterVenue(value);
    }

    onSourceClick = (value) => {

      let temp = value;

      if(this.state.sourceInit != 0) {
      if(value === 'Engineering') {

        if(this.props.source === 'Both')
          temp = "Fashion"
        else {
          temp = "Both"
        }

      }
      else if(value === 'Fashion') {

        if(this.props.source === 'Both')
          temp = "Engineering"
        else {
          temp = "Both"
        }
      }
    }

    else {
      this.setState(prevState => ({
        sourceInit: !prevState.sourceInit + 1,
      }));
    }

    this.props.filterSource(temp);
    }

    render() {

      let w = window.innerWidth / 1280;
      let h = window.innerHeight / 610;

      let venueArr = this.props.searchData;
      venueArr = venueArr.map((venue) => venue["Conference (VENUE)"]);
      venueArr.unshift('All')

      venueArr = venueArr.map((venue) => {

        if(venue === 'All')
          return venue + " (" + this.props.searchData.length + ") ";
          let temp = this.props.searchData.filter((item) => item["Conference (VENUE)"].toLowerCase() === venue.toLowerCase());

          return venue + " (" + temp.length + ") ";
      });


      let filterEngineering = this.props.searchData.filter((item) => {
        return (item["Source"] === "Engineering" || item["Source"] === "Both")
      });

      let filterFashion = this.props.searchData.filter((item) => {
        return (item["Source"] === "Fashion" || item["Source"] === "Both")
      });

      let engLength = filterEngineering.length;
      let fashLength = filterFashion.length;

      engLength = engLength * 100 / (engLength + fashLength);
      fashLength = fashLength * 100 / (fashLength + engLength);

      venueArr = [...new Set(venueArr)];

      venueArr = venueArr.map((venue) => {
        return (
          <DropdownItem onClick={() => this.onVenueClick(venue)}>{venue}</DropdownItem>
        )
      });

      const style = { width: 400 * w, margin: 50 * w};

      const dataPie = [
          {value: 25, color: "black", title: "Function"},
          {value: 50, color: "red", title: "BodyZones"},
          {value: 30, color: "green", title: "Material"},
          {value: 20, color: "blue", title: "Fabrication"},
      ]


      let yearData = [];

      for(let i = 1990; i <= 2019; i++) {

        let temp = this.props.searchData.filter((item) => {

          return item["Year"] === i.toString();
        })

        yearData = [
            ...yearData,
            {
              name: i.toString(),
              Projects: temp.length,
            }
        ];


      }

        const closeBtn = <Button onClick={this.toggleStats} color="secondary">{"Close (X)"}</Button>

      return (
          <div>
              <div>Time Frame</div>
              <BarChart width={390 * w} height={150 * h} data={yearData}
                  margin={{top: 5 * h, right: 30 * w, left: 0, bottom: 0}}>
                  <XAxis dataKey="name" hide={true}/>
                  <Tooltip cursor={false}/>
                  <Bar dataKey="Projects" />
             </BarChart>

              <Range handleStyle={[{ backgroundColor: 'black'}, {backgroundColor: 'black' }]} trackStyle={[{ backgroundColor: 'grey', height: 6 * h + "px"}]}
              allowCross={false}  railStyle={{ backgroundColor: 'black' }} min={1990} max={2018} defaultValue={[1990, 2018]} onChange={(value) => this.onChange(value)} />
              <div>{this.props.minYear}<span style={{float: "right"}}>{this.props.maxYear}</span></div>
              <br />

              <div style={{ marginTop: "2%", color: "black"}}>Publication Venue</div>
              <ButtonDropdown style={{width:"90%", height: '25px', transform: "translateX(5%)"}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle style={{marginBottom: "-5px", backgroundColor: "white", color: "#9B089A"}} caret>
                        {this.state.venue}
                      </DropdownToggle>
                      <DropdownMenu style={{width:"105%", overflowY:"scroll", height:"40vh"}}>
                        {venueArr}
                      </DropdownMenu>
              </ButtonDropdown>

              <div style={{ marginTop: "7%"}}>Filter by:</div>
              <div style={{marginTop: "8px", marginRight: "20px", marginLeft: "20px"}}>
                {(this.props.source === 'Both' || this.props.source === 'Engineering') ? (<Button className="btnSelectorClicked" onClick={() => this.onSourceClick("Engineering")}>Engineering</Button>)
                  : (<Button className="btnSelector" onClick={() => this.onSourceClick("Engineering")}>Engineering</Button>)}
                {(this.props.source === 'Both' || this.props.source === 'Fashion') ? (<Button className="btnSelectorClicked" style={{float: "right"}} onClick={() => this.onSourceClick("Fashion")}>Fashion</Button>)
                 : (<Button className="btnSelector" style={{float: "right"}} onClick={() => this.onSourceClick("Fashion")}>Fashion</Button>)}
              </div>

              <div style={{ marginTop: "5%"}}>
                % Contribution
              </div>
              <div style={{marginTop: '3%', marginLeft: '10px'}}>
                {(this.state.showLabels) ? (<><Label style={{transform: "translateY(4px)", backgroundColor: "#f98686"}} key="Orange" />{' '}<span>Engineering</span>{' '}
                <Label style={{transform: "translateY(4px)", marginLeft: "10px"}} color="red" key="red" />{' '}<span>Fashion</span>{' '}</>) : (<div style={{height: "2vh"}}>Placeholder</div>)}

                  <br />
                  <div>
                  <br />
                  <Progress multi>
                    <Progress className="engStyle" bar value={engLength} />
                    <Progress bar color="danger" value={fashLength} />
                  </Progress>
                  </div>
              </div>

              <div style={{marginTop: "10%", marginLeft: "20%"}}>
                <Button onClick={this.toggleDisplay} outline color="secondary">{(this.props.listView) ? ("View Results in Original Form") : ("View Results in List Form")}</Button>{' '}
              </div>

              {(this.props.loggedIn) ? (<div style={{marginTop: "5%", marginLeft: "20%"}}>
                <Button onClick={this.toggleBookmarks} outline color="secondary">{(this.props.viewBookmarks) ? ("View all Results") : ("View Pinned/Bookmarks")}</Button>{' '}
              </div>) : (<div/>)}

              <div style={{marginTop: "5%", marginLeft: "27%", zIndex: "2500 !important"}}>


                      <Button outline color="secondary" onClick={this.toggleStats}>Resource Statistics</Button>

                      <Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader close={closeBtn} style={{backgroundColor: "black", color: "white"}} toggle={this.toggleStats}>Resource Statistics</ModalHeader>

                        <ModalBody style={{backgroundColor: "black", overflowY: "auto"}}>

                            <div style={{display: "flex", height: "49%"}}>
                               <ColCharts label="Function" />
                               <ColCharts label="Material" />
                            </div>

                            <div style={{display: "flex",height: "49%", marginTop: "2%"}}>
                               <ColCharts label="Fabrication" />
                               <BodyChart />
                            </div>

                        </ModalBody>

                      </Modal>
           </div>

          </div>
        );
    }


    toggleDisplay = () => {

      this.props.toggleDisplay();
    }

    toggleBookmarks = () => {

      this.props.toggleBookmarks();
    }

}

const mapDispatchToProps = dispatch => {
    return {

        filterData: () => dispatch({type: actionTypes.FILTER_DATA}),
        filterYear: (minYear, maxYear) => dispatch({type: actionTypes.FILTER_YEAR, minYear: minYear, maxYear: maxYear}),
        filterVenue: (venue) => dispatch({type: actionTypes.FILTER_VENUE, val: venue}),
        filterSource: (source) => dispatch({type: actionTypes.FILTER_SOURCE, val: source}),
        toggleDisplay: () => dispatch({type: actionTypes.TOGGLE_DISPLAY}),
        toggleBookmarks: () =>  dispatch({type: actionTypes.VIEW_BOOKMARKS}),

    }
};

const mapStateToProps = state => {
    return {

        filter: state.filter,
        minYear: state.minYear,
        maxYear: state.maxYear,
        venue: state.venueFilter,
        source: state.sourceFilter,
        searchData: state.searchData,
        listView: state.listView,
        viewBookmarks: state.viewBookmarks,

        loggedIn: state.isLoggedIn,

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);
