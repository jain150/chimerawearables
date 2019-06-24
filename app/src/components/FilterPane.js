import React, { Component } from 'react';
import { connect } from 'react-redux';

import './filterBody.css'

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import FilterBody from './FilterBody';

import * as actionTypes from '../store/actions';

class FilterPane extends Component {

  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        popoverOpen: false
      };
    }

    toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }

    render() {

      return (
          <div className="filterTab">

          <div style={{transform: "translateX(-100px)"}}>
          <form  id="demo-2">
            <input type="search" placeholder="Search" />
          </form>
          </div>
               <Button style={{transform: "translate(0vh, 40vh)", width: "60px"}} outline color="info" id={'PopoverFilter'}>Show Filters</Button>

               <Popover style={{width: '250px', color: "#9B089A"}} placement="left" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                 <PopoverHeader style={{fontWeight: "bold"}}>Data Filter</PopoverHeader>
                 <PopoverBody style={{color: "#9B089A", fontWeight: "bold", backgroundColor: "#e0dede"}}><FilterBody showLoop={this.props.showLoop}/></PopoverBody>
               </Popover>


          </div>
        );
    }
}


export default FilterPane;
