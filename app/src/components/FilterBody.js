import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'rc-slider/assets/index.css';
import './filterBody.css'
import Slider from 'rc-slider';
import * as actionTypes from '.././store/actions';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
import { ButtonDropdown, Progress, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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
          };
    }

    toggle() {
     this.setState({
       dropdownOpen: !this.state.dropdownOpen
     });
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
      this.props.filterSource(value);
    }

    render() {

      let venueArr = this.props.searchData;
      venueArr = venueArr.map((venue) => venue["Conference (VENUE)"]);

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

      const style = { width: 400, margin: 50 };

      const dataPie = [
          {value: 25, color: "black", title: "Function"},
          {value: 50, color: "red", title: "BodyZones"},
          {value: 30, color: "green", title: "Material"},
          {value: 20, color: "blue", title: "Fabrication"},
      ]

      return (
          <div>
              <div>Time Frame</div>
              <Range handleStyle={[{ backgroundColor: 'black'}, {backgroundColor: 'black' }]} trackStyle={[{ backgroundColor: 'grey', height: "6px"}]}
              allowCross={false}  railStyle={{ backgroundColor: 'black' }} min={1990} max={2018} defaultValue={[1990, 2018]} onChange={(value) => this.onChange(value)} />
              <div>{this.props.minYear}<span style={{float: "right"}}>{this.props.maxYear}</span></div>
              <br />
              <div>Publication Venue</div>
              <ButtonDropdown style={{width:"100%", height: '30px'}} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle style={{marginBottom: "-5px", backgroundColor: "white", color: "#9B089A"}}caret>
                        {this.state.venue}
                      </DropdownToggle>
                      <DropdownMenu style={{width:"100%", overflowY:"scroll", height:"50vh"}}>
                        {venueArr}
                      </DropdownMenu>
              </ButtonDropdown>
              <div style={{marginTop: "20px", marginRight: "20px", marginLeft: "20px"}}>
                {(this.props.source === "Engineering") ? (<Button className="btnSelectorClicked" onClick={() => this.onSourceClick("Engineering")}>Engineering</Button>)
                  : (<Button className="btnSelector" onClick={() => this.onSourceClick("Engineering")}>Engineering</Button>)}
                {(this.props.source === "Fashion") ? (<Button className="btnSelectorClicked" style={{float: "right"}} onClick={() => this.onSourceClick("Fashion")}>Fashion</Button>)
                 : (<Button className="btnSelector" style={{float: "right"}} onClick={() => this.onSourceClick("Fashion")}>Fashion</Button>)}
              </div>
              <div style={{marginTop: "10px"}}>
                % Contribution
              </div>
              <div style={{marginTop: '10px', marginLeft: '10px'}}>
                  <Label style={{transform: "translateY(4px)"}} color="green"  key="Orange" />{' '}<span>Engineering</span>{' '}
                  <Label style={{transform: "translateY(4px)", marginLeft: "10px"}} color="red" key="red" />{' '}<span>Fashion</span>{' '}
                  <br />
                  <div>
                  <br />
                  <Progress multi>
                    <Progress bar color="success" value={engLength} />
                    <Progress bar color="danger" value={fashLength} />
                  </Progress>
                  </div>
              </div>
              <div style={{marginTop: "10px", height: "80%", width: "80%"}}>
              <span>% of explorations of all the selected 15 correlations</span>
              <ReactMinimalPieChart
                  data={dataPie}
                  lineWidth={30}
                  radius={30}
              />
              </div>
              <div style={{marginTop: "10px"}}>
                <Button outline color="secondary">View Results in List Form</Button>{' '}
              </div>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {

        filterData: () => dispatch({type: actionTypes.FILTER_DATA}),
        filterYear: (minYear, maxYear) => dispatch({type: actionTypes.FILTER_YEAR, minYear: minYear, maxYear: maxYear}),
        filterVenue: (venue) => dispatch({type: actionTypes.FILTER_VENUE, val: venue}),
        filterSource: (source) => dispatch({type: actionTypes.FILTER_SOURCE, val: source}),

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

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);
