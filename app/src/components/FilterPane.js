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

   toggleHome = () => {

     this.props.toggleBack();
     this.props.logout();
  }

    render() {

      let val = 'translate(0, 33vh)';
      let popVal = 'translate(0%, 0%)'


      if(this.state.popoverOpen){
        popVal = 'translate(-1275%, 0%)';
      }
      let w = window.innerWidth * 0.22
      let h = window.innerHeight;

      return (

      <div className={(this.props.move) ? ((!this.props.listView) ? ("filterTabMove") : ("filterTabExtra")) : ("filterTab")}>

          <div style={{display: "flex"}}>

              <div className="searchBar">
              <form onSubmit={this.handleSubmit} id="demo-2">
                <input type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
              </form>
              </div>

              <div>
                  <img onClick={this.toggleHome} className="homeButton" src={"ImageDatabase/Icons/MiniHome.png"}
                   alt="" style={{width: '50%', height: "90%", transform: "translate(20%, 25%)", objectFit: "cover"}}/>
              </div>
            </div>

          <div style={{height: "25%"}}>
                  <div style={{transform: val, height: "100%", zIndex: "999"}}>
                      <div className="rotate6" style={{ transform:  popVal}} id={'PopoverFilter'}>

                          <div className="rotate9">
                          <div style={{width: "300%", transform: "translateX(-55%)"}}>
                              DATA<text className="hackText"> _</text>FILTER
                          </div>
                          </div>
                      </div>
                  </div>


                   <Popover hideArrow={true} style={{width: w, maxWidth: w, height: h, maxHeight: h + " !important", color: "black", overflowY: "hide", backgroundColor: "black", zIndex: "10"}} placement="right" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                     <PopoverHeader style={{fontSize: "150%", width: "100%", height: "5%", backgroundColor: "black", color: "white"}}>Data Filter</PopoverHeader>
                     <PopoverBody style={{color: "black", width: "100%", height: "95%", fontWeight: "500", backgroundColor: "black", color: "white"}}><FilterBody filterToggle={this.toggleVisibility} showLoop={this.props.showLoop} mainPage={this.props.mainPage}/></PopoverBody>
                   </Popover>
            </div>

            <div style={{ marginTop: "380%", color: "white"}}>
                Views: {this.props.viewCount}
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

        logout: () => dispatch({type: actionTypes.AUTH_FAILURE}),
    }
};


const mapStateToProps = state => {
    return {
        listView: state.listView,
        viewCount: state.viewCount,
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(FilterPane);
