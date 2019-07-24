import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bodyZones.css'
import * as actionTypes from '../store/actions';
import ImageMapper from 'react-image-mapper';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class ColCharts extends Component {

  constructor(props) {

      super(props);

        this.state = {

        };
  }

  render() {

    const label = this.props.label;

    /*
      I have search data and I have a label
    */

    let curList = [];
    let data = [];
    if(this.props.label === 'Function') {
          curList = this.props.function;


          curList = curList.map((subType) => {

          let temp = this.props.searchData.filter((item) => {

            return (item["Function 1"].toLowerCase().trim().includes(subType.toLowerCase().trim())
            || item["Function 2"].toLowerCase().trim().includes(subType.toLowerCase().trim())
            || item["Function 3"].toLowerCase().trim().includes(subType.toLowerCase().trim()))
          });

          return {name: subType, Results: temp.length}
        });


    data = curList;
    }

    else if(this.props.label === 'Fabrication') {

      curList = this.props.fabrication;


      curList = curList.map((subType) => {

      let temp = this.props.searchData.filter((item) => {

        return item["Fabrication 1"].toLowerCase().trim().includes(subType.toLowerCase().trim())
        || item["Fabrication 2"].toLowerCase().trim().includes(subType.toLowerCase().trim())
      });

      return {name: subType, Results: temp.length}
      });
      data = curList;
    }

    else {

      curList = this.props.material;


      curList = curList.map((subType) => {

      let temp = this.props.searchData.filter((item) => {

        return (item["Material 1"].toLowerCase().trim().includes(subType.toLowerCase().trim())
        || item["Material 2"].toLowerCase().trim().includes(subType.toLowerCase().trim())
        || item["Material 3"].toLowerCase().trim().includes(subType.toLowerCase().trim()))
      });

      return {name: subType, Results: temp.length}
    });


      data = curList;
    }


    return (
      <div style={{width: "50%", display: "flex"}}>

      <div style={{color:"white", fontWeight: "bold"}}>{this.props.label}</div>
      <div style={{transform: "translateX(-30px)"}}>
            <BarChart width={550} height={240} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>

           <XAxis dataKey="name"/>
           <YAxis/>
           <Tooltip cursor={false}/>
           <Bar dataKey="Results" fill="black" />
          </BarChart>
    </div>

      </div>
    )

  }
}

const mapStateToProps = state => {
    return {
        searchData: state.searchData,
        function: state.functions,
        material: state.material,
        fabrication: state.fabrication,
    }
};

export default connect(mapStateToProps)(ColCharts);
