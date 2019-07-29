import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bodyZones.css'
import * as actionTypes from '../store/actions';
import ImageMapper from 'react-image-mapper';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class BodyChart extends Component {

  constructor(props) {

      super(props);

        this.state = {

        };
  }

  render() {


    let curList = [];
    let data = [];

    curList = this.props.bodyZones;

    curList = curList.map((subType) => {

    let temp = this.props.searchData.filter((item) => {

      return (item["Body Zone 1"].toLowerCase().trim().includes(subType.toLowerCase().trim())
      || item["Body Zone 2"].toLowerCase().trim().includes(subType.toLowerCase().trim())
      || item["Body Zone 3"].toLowerCase().trim().includes(subType.toLowerCase().trim()))
    });

    return {name: subType, value: temp.length}
  });

    data = curList;
    let out = {};
    for(let i = 0; i < data.length; i++) {
      out[data[i].name] = data[i].value;
    }

    console.log(out);


    let w = window.innerWidth / 1280;
    let h = window.innerHeight / 610;

    let val = "translate(" + 20 * w + "px, -" + 30 * h + "px)"

    return (
      <div style={{width: "50%", display: "flex"}}>
          <div style={{color:"white", fontWeight: "bold"}}>Body Zones</div>
          <div style={{transform: val, position: "relative"}}>
              <img src={"ImageDatabase/Icons/BodyStats.jpg"}
               alt="" style={{height: '100%', width: "55%", objectFit: "cover"}}/>
               <div style={{position: "absolute", top: "16%", left: "10%", color: "white", fontSize: 12 * w + 'px'}}>{out["Head"]}</div>
               <div style={{position: "absolute", top: "25%", left: "10%", color: "white", fontSize: 12 * w + 'px'}}>{out["Back"]}</div>
               <div style={{position: "absolute", top: "35%", left: "10%", color: "white", fontSize: 12 * w + 'px'}}>{out["Chest"]}</div>
               <div style={{position: "absolute", top: "49%", left: "10%", color: "white", fontSize: 12 * w + 'px'}}>{out["Pelvic Region"]}</div>
               <div style={{position: "absolute", bottom: "2.5%", left: "10%", color: "white", fontSize: 12 * w + 'px'}}>{out["Feet"]}</div>

               <div style={{position: "absolute", top: "35%", left: "43%", color: "white", fontSize: 12 * w + 'px'}}>{out["Arms"]}</div>
               <div style={{position: "absolute", top: "48%", left: "43%", color: "white", fontSize: 12 * w + 'px'}}>{out["Wrist and Hand"]}</div>
               <div style={{position: "absolute", top: "72%", left: "43%", color: "white", fontSize: 12 * w + 'px'}}>{out["Legs"]}</div>

               <div style={{position: "absolute", top: "50%", left: "55%", color: "white", fontSize: 12 * w * h + 'px'}}>{out["Full Body"]}</div>

           </div>
      </div>
    )

  }
}

const mapStateToProps = state => {
    return {
        searchData: state.searchData,
        bodyZones: state.bodyZones,
    }
};

export default connect(mapStateToProps)(BodyChart);
