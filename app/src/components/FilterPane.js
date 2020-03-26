import React, { Component } from 'react';
import { connect } from 'react-redux';

import './filterBody.css'

import { Button, UncontrolledPopover, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

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

     if(this.props.move)
      this.props.toggleMainDisplay();
     this.props.logout();
  }

    render() {

      let val = 'translate(0, 100%)';
      let popVal = 'translate(0%, 0%)'


      if(this.state.popoverOpen){
        popVal = 'translate(-1275%, 0%)';
      }
      let w = window.innerWidth * 0.22
      let h = window.innerHeight * 0.98;

      return (

      <div className={(this.props.move) ? ((!this.props.listView) ? ("filterTabMove") : ("filterTabExtra")) : ("filterTab")}>

          <div style={{display: "flex"}}>

              {/*<div className="searchBar">
              <form onSubmit={this.handleSubmit} id="demo-2">
                <input type="search" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
              </form>
      </div>*/}

              <div>
                  <img onClick={this.toggleHome} className="homeButton" src={"ImageDatabase/Icons/MiniHome.png"}
                   alt="" style={{width: '2vw', transform: "translate(20%, 40%)", objectFit: "cover"}}/>
              </div>
            </div>

          <div style={{height: "25%"}}>
                  <div style={{transform: val, height: "100%", zIndex: "999"}}>
                      <div className="rotate6" style={{ transform:  popVal}} id={'PopoverFilter'}>

                          <div className="rotate9">
                          <div style={{width: "450%", transform: "translateX(-57.5%)"}}>
                              DATA<text className="hackText"> _</text>FILTER
                          </div>
                          </div>
                      </div>
                  </div>


                   <UncontrolledPopover hideArrow={true} trigger="legacy" style={{width: w, maxWidth: w, height: h, maxHeight: h + " !important", color: "black", overflowY: "scroll", backgroundColor: "black", zIndex: "10"}} placement="right" isOpen={this.state.popoverOpen} target={'PopoverFilter'} toggle={this.toggle}>
                     <PopoverHeader style={{fontSize: "150%", width: "100%", height: "5%", backgroundColor: "black", padding: "0 0", color: "white"}}><div style={{marginLeft: "3%", marginTop: "2%"}}>Data Filter</div></PopoverHeader>
                     <PopoverBody style={{color: "black", width: "100%", height: "95%", fontWeight: "500", padding: "0 .6rem", backgroundColor: "black", color: "white"}}><FilterBody filterToggle={this.toggleVisibility} showLoop={this.props.showLoop} mainPage={this.props.mainPage}/></PopoverBody>
                   </UncontrolledPopover>
            </div>

            {(this.props.showView) ? (<div style={{ marginTop: "380%", color: "white"}}>
                Views: {this.props.viewCount}
            </div>) : (<></>)}

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
