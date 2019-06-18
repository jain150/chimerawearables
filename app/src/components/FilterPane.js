import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          <div>


               <Button style={{transform: "translateY(40vh)"}} outline color="info" id={'PopoverFilter'}>Show Filters</Button>

               <Popover style={{width: '250px'}} placement="left" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                 <PopoverHeader style={{fontWeight: "bold"}}>Filter the Data</PopoverHeader>
                 <PopoverBody><FilterBody /></PopoverBody>
               </Popover>


          </div>
        );
    }
}


export default FilterPane;
