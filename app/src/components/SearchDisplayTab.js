import React, { Component } from 'react';
import { connect } from 'react-redux';
import './searchDisplay.css'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class SearchDisplayTab extends Component {

  render() {

    let inp = '';

    inp = this.props.arr.map((input) => {

      return (
        <>
        <div />
        <div style={{width: '20vh', height: '100%'}}>
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardTitle>{input["Refernce Name"]}</CardTitle>
            <Button href={input["Reference Link"]}>Go</Button>
        </Card>
        </div>
        <div />
        </>

      )
    });


    return (
      <div className="searchStore">
        <div className="leftPaneSearch">
            <div div className="rotate">{this.props.type}</div>
        </div>
        {inp}
      </div>
    )
  }
}


export default SearchDisplayTab;
