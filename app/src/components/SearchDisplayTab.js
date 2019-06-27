import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardImg, CardBody,
 CardSubtitle } from 'reactstrap';

import './searchDisplay.css'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class SearchDisplayTab extends Component {

  render() {

    let inp = '';

    inp = this.props.arr.map((input) => {

      console.log(input["PIC ID"]);

      if(input["PIC ID"] === undefined || input["PIC ID"].length == 0)
        return (
          <div />
        )

      else {
      return (

        <div style={{marginLeft: '15px'}}>

          <div className="bgimg">
            <a  href={input["Reference Link"]}>

            <img id="image" src={"http://127.0.0.1:8087/ImageDatabase/" + input["PIC ID"] + ".jpg"}  onerror={"this.onerror=null; this.src=" + "http://127.0.0.1:8087/ImageDatabase/" + input["PIC ID"] + ".png"} alt="" style={{height: '95%', width: '100%', objectFit: 'cover'}}/>
            </a>
            <div id="title" className="centered">{(input["Reference Name"].length < 40) ? (input["Reference Name"]) : (input["Reference Name"].substring(0, 40) + "...")}</div>
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
          <div style={{display: 'flex', height: "110%", overflowX: 'scroll', overflowY: 'hidden'}}>
            {inp}
          </div>
        </div>
    </div>
    )
  }
}


export default SearchDisplayTab;
