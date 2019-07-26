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
        visibility: 'visible',
      };
    }

    toggleVisibility = () => {
      if(this.state.visibility === 'visible') {
        this.setState({
          visibility: 'hidden',
        });
      }
      else {
        this.setState({
          visibility: 'visible',
        });
      }

      console.log(this.state.visibility);
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

      let val = 'translate(0, 33vh)';
      if(this.state.popoverOpen){
        val = 'translate(-320%, 33vh)';

      }

      return (

      <div className={(this.props.move) ? ((!this.props.listView) ? ("filterTabMove") : ("filterTabExtra")) : ("filterTab")}>

          <div className="searchBar">
          <form onSubmit={this.handleSubmit} id="demo-2">
            <input type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
          </form>
          </div>

          <div style={{transform: val, height: "25%", zIndex: "999"}}>
                  <div className="rotate6" id={'PopoverFilter'}><div className="innerText"></div></div>


               <Popover hideArrow={true} style={{width: "102%", height: "100vh", color: "black", transform: "translate(-0.3vw, 1%)", zIndex: "10"}} placement="right" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                 <PopoverHeader style={{fontWeight: "bold", fontSize: "medium", width: "102%", height: "5%", backgroundColor: "black", color: "white"}}>Data Filter</PopoverHeader>
                 <PopoverBody style={{color: "black", width: "102%", height: "95%", fontWeight: "bold", backgroundColor: "black", color: "white"}}><FilterBody filterToggle={this.toggleVisibility} showLoop={this.props.showLoop}/></PopoverBody>
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


const mapStateToProps = state => {
    return {
        listView: state.listView,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FilterPane);
