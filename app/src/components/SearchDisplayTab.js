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

      return (

        <div style={{marginLeft: '15px'}}>

          <div className="bgimg">
            <a  href={input["Reference Link"]}>
            <img src={"http://127.0.0.1:8087/ImageDatabase/" + input["PIC ID"] + ".jpg"}  style={{height: '95%', width: '100%', objectFit: 'cover'}}/>
            </a>
            <div className="centered">{(input["Refernce Name"].length < 30) ? (input["Refernce Name"]) : (input["Refernce Name"].substring(0, 30) + "...")}</div>
          </div>


        </div>



      )
    });


    return (
      <div className="searchStore">
        <div className="leftPaneSearch">
            <div className="rotate">{this.props.type}</div>
        </div>

        <div style={{overflow: 'hidden'}}>
          <div style={{display: 'flex', overflowX: 'scroll', overflowY: 'hidden'}}>
            {inp}
          </div>
        </div>
    </div>
    )
  }
}


export default SearchDisplayTab;
