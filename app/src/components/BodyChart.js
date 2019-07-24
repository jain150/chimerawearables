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

    return (
      <div style={{width: "50%", display: "flex"}}>
          <div style={{color:"white", fontWeight: "bold"}}>Body Zones</div>
          <div style={{transform: "translate(20px, -30px)", position: "relative"}}>
              <img src={"ImageDatabase/Icons/BodyStats.jpg"}
               alt="" style={{height: '40vh', width: '25vw', objectFit: "cover"}}/>
               <div style={{position: "absolute", top: "12%", left: "18%", color: "white", fontSize: "small"}}>{out["Head"]}</div>
               <div style={{position: "absolute", top: "23%", left: "18%", color: "white", fontSize: "small"}}>{out["Back"]}</div>
               <div style={{position: "absolute", top: "33%", left: "18%", color: "white", fontSize: "small"}}>{out["Chest"]}</div>
               <div style={{position: "absolute", top: "48%", left: "18%", color: "white", fontSize: "small"}}>{out["Pelvic Region"]}</div>
               <div style={{position: "absolute", bottom: "0.5%", left: "18%", color: "white", fontSize: "small"}}>{out["Feet"]}</div>

               <div style={{position: "absolute", top: "25%", left: "77%", color: "white", fontSize: "small"}}>{out["Arms"]}</div>
               <div style={{position: "absolute", top: "48%", left: "78%", color: "white", fontSize: "small"}}>{out["Wrist and Hand"]}</div>
               <div style={{position: "absolute", top: "61%", left: "78%", color: "white", fontSize: "small"}}>{out["Legs"]}</div>

               <div style={{position: "absolute", top: "40%", right: "3.6%", color: "white", fontSize: "small"}}>{out["Full Body"]}</div>

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
