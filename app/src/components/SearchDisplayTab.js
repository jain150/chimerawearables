import React, { Component } from 'react';

import { CardImg, CardBody,
 CardSubtitle } from 'reactstrap';

 import HorizontalScroll from 'react-scroll-horizontal'

 import * as actionTypes from '.././store/actions';
 import { connect } from 'react-redux';

import './searchDisplay.css'

import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Tooltip } from 'reactstrap';

class SearchDisplayTab extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tooltipOpenCost: false,
      tooltipOpenImp: false,
      tooltipOpenWear: false,
    };

    this.toggleImp = this.toggleImp.bind(this);
    this.toggleCost = this.toggleCost.bind(this);
    this.toggleWear = this.toggleWear.bind(this);

  }

  toggleCost = () => {
    this.setState({
      tooltipOpenCost: !this.state.tooltipOpenCost
    });
  }

  toggleImp = () => {
    this.setState({
      tooltipOpenImp: !this.state.tooltipOpenImp
    });
  }

  toggleWear = () => {
    this.setState({
      tooltipOpenWear: !this.state.tooltipOpenWear
    });
  }

  updateBookmark = (name) => {

    let temp = name.substring(10);
    console.log(temp);
    this.props.updateBookmark(temp);

  }

  componentDidMount() {

  let item1 = document.getElementById("scroller0");
  let item2 = document.getElementById("scroller1");
  let item3 = document.getElementById("scroller2");
  let item4 = document.getElementById("scroller3");
  let item5 = document.getElementById("scroller4");

  window.addEventListener('wheel', function(e) {

      if(e.deltaX !== 0) {

          if(e.y < item1.getBoundingClientRect().bottom) {
            item1.scrollLeft += e.deltaX;

          }

          else if(e.y < item2.getBoundingClientRect().bottom) {
     item2.scrollLeft += e.deltaX;

          }

          else if(e.y < item3.getBoundingClientRect().bottom) {
          item3.scrollLeft += e.deltaX;;

          }

          else if(e.y < item4.getBoundingClientRect().bottom) {
            item4.scrollLeft += e.deltaX;

          }

          else if(e.y < item5.getBoundingClientRect().bottom) {
            item5.scrollLeft += e.deltaX;

          }

      }

      else if(e.y < item1.getBoundingClientRect().bottom) {
        if (e.deltaY > 0) item1.scrollLeft += 100;
        else item1.scrollLeft -= 100;
      }

      else if(e.y < item2.getBoundingClientRect().bottom) {
        if (e.deltaY > 0) item2.scrollLeft += 100;
        else item2.scrollLeft -= 100;
      }

      else if(e.y < item3.getBoundingClientRect().bottom) {
        if (e.deltaY > 0) item3.scrollLeft += 100;
        else item3.scrollLeft -= 100;
      }

      else if(e.y < item4.getBoundingClientRect().bottom) {
        if (e.deltaY > 0) item4.scrollLeft += 100;
        else item4.scrollLeft -= 100;
      }

      else if(e.y < item5.getBoundingClientRect().bottom) {
        if (e.deltaY > 0) item5.scrollLeft += 100;
        else item5.scrollLeft -= 100;
      }

    });

  }

  render() {

    let inp = '';

    let i = 0;
    let j = 0;

    if(this.props.type === 'Research')
      j = 1;
    else if(this.props.type === 'Tutorial')
      j = 2;
    else if(this.props.type === 'Aesthetic Approach')
      j = 3;
    else if(this.props.type === 'Design Concepts')
      j = 4

    inp = this.props.arr.map((input) => {

      i++;
      let check = this.props.bookMarks.includes(input["Reference Link"].substring(10));


      let wearToken = "nwear1";
      if(parseInt(input["Wearability"]) <= 10)
        wearToken = "nwear1";
      else if(parseInt(input["Wearability"]) <= 20)
        wearToken = "nwear2";
      else if(parseInt(input["Wearability"]) <= 50)
        wearToken = "nwear3";
      else if(parseInt(input["Wearability"]) <= 70)
        wearToken = "nwear4";
      else if(parseInt(input["Wearability"]) <= 100)
        wearToken = "nwear5";

      let costToken = "$$"

      if(parseInt(input["costMetric"]) > 17)
        costToken = "$$$";
      else if(parseInt(input["costMetric"]) >= 6)
        costToken = "$$";
      else
        costToken = "$";


      let col = "green";

      if(parseInt(input["impMetric"]) === 3)
        col = "red";
      else if(parseInt(input["impMetric"]) === 2)
        col = "yellow";


      return (

        <div className="itemStyle">

          <div className="bgimg">
            <a  href={input["Reference Link"]} target="_blank">

            <img id="image" src={"ImageDatabase/" + input["PIC ID"] + ".jpg"}  onerror={"this.onerror=null; this.src=" + "ImageDatabase/" + input["PIC ID"] + ".png"} alt="" style={{height: '20vh', width: '100%', objectFit: 'cover'}}/>
            </a>
            <a  href={input["Reference Link"]} target="_blank">
            <div id="title" className="centered">{(input["Reference Name"].length < 40) ? (input["Reference Name"]) : (input["Reference Name"].substring(0, 40) + "...")}</div>
            </a>

            {(this.props.loggedIn) ? (<div id="title" className="ticker"><Input checked={check} onClick={() => this.updateBookmark(input["Reference Link"])} type="checkbox" />{' '}</div>) : (<div/>)}


            <div className="cost"><div style={{backgroundColor: "#f7f7f7", borderRadius: "4px", opacity: "0.75", height: '30%', width: '80%'}}><div style={{ height: "100%", fontSize: "100%"}}>{costToken}</div></div>
            <div class="tooltipCost">
                        COST LEVEl:
                        Relationship between materials and the
                        fabrication technique implemented in
                        each work.
            </div>

            </div>

            <div className="imp">
                  <div style={{height: '30%', width: '75%', backgroundColor: col }}>
            </div>
            <div class="tooltipImp">
                  IMPLEMENTATION LEVEL:
                  This metric takes into consideration
                  the time taken to implement the functionalities
                  mentioned in each resource (i.e. function,
                  coding requirements, etc.).
                  It is scaled on a red, yellow, green ranking
                  system from longest to shortest implementation
                  time respectively."
            </div>

            </div>

            <div className="wear">
                             <img src={"ImageDatabase/Icons/" + wearToken + ".png"}
                              alt="" style={{width: '85%', objectFit: "cover", transform: "translate(-50%, 5%)", position: "absolute"}} />
                  <div class="tooltipWear">
                    WEARABILITY LEVEL:
                    Five levels of wearability were defined using
                    principles such as:
                    Attachment to the Body, Maintainance required
                    Activity obstruction, System integration
                    Context application, Aesthetics consideration
                  </div>
            </div>


          </div>
        </div>

      )
    
    });


    return (
      <div className="searchStore">

        <div className="leftPaneSearch">
            <div className="rotate1">{this.props.type}</div>
        </div>

        <div className="searchTabContent">

          <div id={"scroller" + this.props.count} className="scrollStyle" style={{display: 'flex', height: "100%", flexWrap: "nowrap"}}>
            {inp}
          </div>

        </div>

    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBookmark: (value) => dispatch({type: actionTypes.UPDATE_BOOKMARKS, val: value.toString(0,20)}),
    }
};

const mapStateToProps = state => {
    return {
        bookMarks: state.bookMarks,

        loggedIn: state.isLoggedIn,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplayTab);
