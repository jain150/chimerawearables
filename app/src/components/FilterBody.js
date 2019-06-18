import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';

import * as actionTypes from '.././store/actions';

import ReactMinimalPieChart from 'react-minimal-pie-chart';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);




class FilterBody extends Component {

  constructor(props) {
    super(props);

  this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      publication: 'Publication Venue'
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

    render() {

      const style = { width: 400, margin: 50 };

      const dataPie = [
          {value: 25, color: "black", title: "Function"},
          {value: 50, color: "red", title: "BodyZones"},
          {value: 30, color: "green", title: "Material"},
          {value: 20, stroke: "blue", title: "Fabrication"},
      ]

      return (
          <div>
              <div>What's the timeframe?</div>
              <Range allowCross={false} min={1990} max={2018} defaultValue={[1990, 2018]} onChange={(value) => this.onChange(value)} />

              <div>{this.props.minYear} to {this.props.maxYear}</div>
              <hr />
              <div>Publication Venue</div>

              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        UIST
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>UIST</DropdownItem>
                        <DropdownItem>ACM</DropdownItem>
                      </DropdownMenu>
              </ButtonDropdown>
              <hr />
              <div style={{marginTop: "10px"}}>
                <Button color="secondary">Engineering</Button>
                <Button style={{float: "right"}} color="info">Fashion</Button>
              </div>

              <hr />
              <div style={{marginTop: "10px"}}>
                <Button outline color="secondary">Press to change to a list view</Button>{' '}
              </div>

              <div style={{marginTop: "10px"}}>

              <ReactMinimalPieChart
                  data={dataPie}
                  lineWidth={10}
                  radius={30}
              />
              </div>
              <div>% of explorations of all the selected 15 correlatios</div>
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {

        filterData: () => dispatch({type: actionTypes.FILTER_DATA}),
        filterYear: (minYear, maxYear) => dispatch({type: actionTypes.FILTER_YEAR, minYear: minYear, maxYear: maxYear}),

    }
};

const mapStateToProps = state => {
    return {

        filter: state.filter,
        minYear: state.minYear,
        maxYear: state.maxYear,
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(FilterBody);
