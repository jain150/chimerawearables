import React, { Component } from 'react';

import { CardImg, CardBody,
 CardSubtitle } from 'reactstrap';

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


      let wearToken = "Wear1";
      if(parseInt(input["Wearability"]) <= 10)
        wearToken = "Wear1";
      else if(parseInt(input["Wearability"]) <= 20)
        wearToken = "Wear2";
      else if(parseInt(input["Wearability"]) <= 50)
        wearToken = "Wear3";
      else if(parseInt(input["Wearability"]) <= 70)
        wearToken = "Wear4";
      else if(parseInt(input["Wearability"]) <= 100)
        wearToken = "Wear5";

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

      if(input["PIC ID"] === undefined || input["PIC ID"].length == 0)
        return (
          <div />
        )

      else {
      return (

        <div style={{marginLeft: '10px', borderWidth: "medium", borderStyle:"solid"}}>

          <div className="bgimg">
            <a  href={input["Reference Link"]} target="_blank">

            <img id="image" src={"ImageDatabase/" + input["PIC ID"] + ".jpg"}  onerror={"this.onerror=null; this.src=" + "ImageDatabase/" + input["PIC ID"] + ".png"} alt="" style={{height: '20vh', width: '100%', objectFit: 'cover'}}/>
            </a>
            <a  href={input["Reference Link"]} target="_blank">
            <div id="title" className="centered">{(input["Reference Name"].length < 40) ? (input["Reference Name"]) : (input["Reference Name"].substring(0, 40) + "...")}</div>
            </a>

            {(this.props.loggedIn) ? (<div id="title" className="ticker"><Input checked={check} onClick={() => this.updateBookmark(input["Reference Link"])} type="checkbox" />{' '}</div>) : (<div/>)}


            <div className="cost"><div style={{backgroundColor: "#f7f7f7", borderRadius: "4px", opacity: "0.75", height: '18px', width: '18px'}}>{costToken}</div>
            <div class="tooltipCost">Cost</div>

        </div>

            <div className="imp">
                  <div style={{height: '18px', width: '18px', backgroundColor: col}}>
            </div>
            <div class="tooltipImp">Implementation</div>

        </div>

            <div className="wear">
                             <img src={"ImageDatabase/Icons/" + wearToken + ".png"}
                              alt="" style={{height: '18px', width: '18px', objectFit: "cover"}}/>


                  <div class="tooltipWear">Wearability</div>
            </div>


          </div>
        </div>

      )
    }
    });


    return (
      <div className="searchStore">

        <div className="leftPaneSearch">
            <div className="rotate1">{this.props.type}</div>
        </div>

        <div className="searchTabContent">
          <div style={{display: 'flex', height: "105%", overflowX: 'scroll', overflowY: 'hidden'}}>
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
