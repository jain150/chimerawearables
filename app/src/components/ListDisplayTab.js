import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardImg, CardBody,
 CardSubtitle } from 'reactstrap';

import './searchDisplay.css'

import { Card, Button, CardTitle, CardText } from 'reactstrap';
import { Table } from 'reactstrap';

class ListDisplayTab extends Component {

  render() {

    let inp = '';
    let i = 1;
    inp = this.props.arr.map((input) => {

      return (
        <tr>
          <th scope="row">{i++}</th>
          <td>{input["Reference Name"]}</td>
          <td><a  href={input["Reference Link"]}>{input["Reference Link"]}</a></td>
        </tr>
    )});

    return (
      <div>
      <h3>{this.props.type}</h3>
      <Table dark>
      <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        {inp}
      </tbody>
    </Table>
    </div>
    )
  }
}


export default ListDisplayTab;
