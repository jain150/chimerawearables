import React, { Component } from 'react';
import { connect } from 'react-redux';

import './filterBody.css'

import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import FilterBody from './FilterBody';
import * as actionTypes from '../store/actions';

class FilterPane extends Component {

  /*
    Make a boolean in store, whether results to be displayed are from searchQuery
    Store the search query itself

    Define an action to store search query
  */


  constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        value: '',
        popoverOpen: false,
      };
    }

    toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }

    handleChange = (event) => {
       this.setState({value: event.target.value});
     }

   handleSubmit = (event) => {

     this.props.toggleDisplay();
     this.props.searchTermDisplayUpdate();
     this.props.searchTermQueryUpdate(this.state.value);

     this.setState({value: ''});
     event.preventDefault();

   }

    render() {

      return (

          <div className={(this.props.move) ? ("filterTabMove") : ("filterTab")}>

          <div style={{transform: "translateX(-100px)"}}>
          <form onSubmit={this.handleSubmit} id="demo-2">
            <input type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
          </form>
          </div>
          <div style={{transform: "translate(0, 30vh)", padding: "0 0 0 0"}}>
               <Button className="rotate" style={{ width: "180px", height: "50px", color: "#6b0a64",   borderStyle: "solid", borderColor: "#6b0a64", borderWidth: "5px"}} outline color="info" id={'PopoverFilter'}><div style={{ transform: "translateY(-10px)",  borderTopStyle: "solid", borderColor: "#6b0a64", borderWidth: "2px"}}><b>_____________</b></div><div style={{ transform: "translateY(-20px)",  borderTopStyle: "solid", borderColor: "#6b0a64", borderWidth: "2px"}}><b>_____________</b></div></Button>

               <Popover style={{width: '250px', color: "#9B089A"}} placement="left" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                 <PopoverHeader style={{fontWeight: "bold"}}>Data Filter</PopoverHeader>
                 <PopoverBody style={{color: "#9B089A", fontWeight: "bold", backgroundColor: "#e0dede"}}><FilterBody showLoop={this.props.showLoop}/></PopoverBody>
               </Popover>
               </div>
          </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {

        searchTermDisplayUpdate: () => dispatch({type: actionTypes.SEARCH_TERM_DISPLAY}),
        searchTermQueryUpdate: (value) => dispatch({type: actionTypes.SEARCH_TERM_QUERY, val: value}),
        toggleDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
    }
};


export default connect(null, mapDispatchToProps)(FilterPane);
