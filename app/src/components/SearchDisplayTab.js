import React, { Component } from 'react';

import { CardImg, CardBody,
 CardSubtitle } from 'reactstrap';

 import * as actionTypes from '.././store/actions';
 import { connect } from 'react-redux';

import './searchDisplay.css'

import { Card, Button, CardTitle, CardText, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class SearchDisplayTab extends Component {

  updateBookmark = (name) => {

    this.props.updateBookmark(name);

  }
  render() {

    let inp = '';

    inp = this.props.arr.map((input) => {


      let check = this.props.bookMarks.includes(input["Reference Link"]);

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


      if(input["PIC ID"] === undefined || input["PIC ID"].length == 0)
        return (
          <div />
        )

      else {
      return (

        <div style={{marginLeft: '10px', borderWidth: "medium", borderStyle:"solid"}}>

          <div className="bgimg">
            <a  href={input["Reference Link"]} target="_blank">

            <img id="image" src={"http://127.0.0.1:8087/ImageDatabase/" + input["PIC ID"] + ".jpg"}  onerror={"this.onerror=null; this.src=" + "http://127.0.0.1:8087/ImageDatabase/" + input["PIC ID"] + ".png"} alt="" style={{height: '20vh', width: '100%', objectFit: 'cover'}}/>
            </a>
            <a  href={input["Reference Link"]} target="_blank">
            <div id="title" className="centered">{(input["Reference Name"].length < 40) ? (input["Reference Name"]) : (input["Reference Name"].substring(0, 40) + "...")}</div>
            </a>
            <div id="title" className="ticker"><Input checked={check} onClick={() => this.updateBookmark(input["Reference Link"])} type="checkbox" />{' '}</div>

            <div id="title" className="cost"><div style={{backgroundColor: "#f7f7f7", borderRadius: "4px", opacity: "0.75"}}>{costToken}</div></div>

            <div id="title" className="wear">
                             <img src={"http://127.0.0.1:8087/ImageDatabase/Icons/" + wearToken + ".png"}
                              alt="" style={{height: '18px', width: '18px', objectFit: "cover"}}/>
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

        <div style={{overflow: 'hidden'}}>
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
        updateBookmark: (value) => dispatch({type: actionTypes.UPDATE_BOOKMARKS, val: value}),
    }
};

const mapStateToProps = state => {
    return {
        bookMarks: state.bookMarks,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplayTab);
