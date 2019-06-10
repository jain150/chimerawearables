import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'
import Hexagon from 'react-hexagon'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

import * as actionTypes from '.././store/actions';

class Matrix extends Component {

  /*

    On Click,

    Define action to switch to search Display.
    Define action that takes in boolean array and name array and stores them in redux state.


    Now, in searchDisplay, handle the filtering and do mapStateToProps

  */

    onClick = (name_array, bool_param, query_param_array) => {

        console.log("LOL");
        console.log(bool_param);
        console.log(name_array);
        console.log(query_param_array);

        if(bool_param) {

          this.props.toggleDisplay();
          this.props.updateQuery(name_array, query_param_array);
        }

        /*
          call searchUpdate

          if search if all of param array contains true
        */
    };

    render() {

            let name_array = [];
            name_array[0] = 'Function';
            name_array[1] = 'BodyZones';
            name_array[2] = 'Fabrication';
            name_array[3] = 'Material'

            let bool_array = [];
            bool_array.push(false);
            bool_array.push(false);
            bool_array.push(false);
            bool_array.push(false);

            if(this.props.selFunction !== '') {
                bool_array[0] = true;
                name_array[0] = this.props.selFunction;
              }

            if(this.props.selBodyZones !== '') {
                bool_array[1] = true;
                name_array[1] = this.props.selBodyZones;
            }

            if(this.props.selFabrication !== '') {
                bool_array[2] = true;
                name_array[2] = this.props.selFabrication;
            }

            if(this.props.selMaterial !== '') {
                bool_array[3] = true;
                name_array[3] = this.props.selMaterial;
            }

            let outFuncBod = '';
            let isOutFuncBod = false;

            if(this.props.selFunction === '' || this.props.selBodyZones === '') {

                 outFuncBod = 'Function + Body Zones';
                 isOutFuncBod = true;
            }
            else {
                outFuncBod = this.props.selFunction + "+" + this.props.selBodyZones;
            }


            return (

             <div className="matrixBody">
                <div style={{marginTop: '10px', marginLeft: '30px'}}>
                    <Card body onClick={() => this.onClick(name_array, bool_array[0])} inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{name_array[0]}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[1])} inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle style={{color:"#8C3636"}}>{name_array[1]}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[2])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%' }}>
                          <CardTitle style={{color:"#8C3636"}}>{name_array[2]}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[3])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{name_array[3]}</CardTitle>

                    </Card>
                 </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>

                    <Card body onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'16%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[1]) ? (name_array[0] + "+" + name_array[1]) : ("Function + Body Zones")}</CardTitle>


                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[2]) ? (name_array[0] + "+" + name_array[2]) : ("Function + Fabrication")}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[3]) ? (name_array[0] + "+" + name_array[3]) : ("Function + Material")}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[1] && bool_array[2]) ? (name_array[1] + "+" + name_array[2]) : ("BodyZones + Fabrication")}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[1] && bool_array[3]) ? (name_array[1] + "+" + name_array[3]) : ("BodyZones + Material")}</CardTitle>

                    </Card>

                    <Card body onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3])} inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'16%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[2] && bool_array[3]) ? (name_array[2] + "+" + name_array[3]) : ("Fabrication + Material")}</CardTitle>

                    </Card>

                </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>

                    <Card onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[1] && bool_array[2]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[2]) : ("Function + BodyZones + Fabrication")}</CardTitle>

                    </Card>

                    <Card onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3])} body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[1] && bool_array[3]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[3]) : ("Function + BodyZones + Material")}</CardTitle>

                    </Card>

                    <Card onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3])} body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[2] && bool_array[3]) ? (name_array[0] + "+" + name_array[2] + "+" + name_array[3]) : ("Function + Fabrication + Material")}</CardTitle>

                    </Card>

                    <Card onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3])} body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle style={{color:"#8C3636"}}>{(bool_array[1] && bool_array[2] && bool_array[3]) ? (name_array[1] + "+" + name_array[2] + "+" + name_array[3]) : ("BodyZones + Fabrication + Material")}</CardTitle>

                    </Card>
                </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>

                <Card onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3])} body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                height:'30%'}}>
                      <CardTitle style={{color:"#8C3636"}}>{(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[2] + "+" + name_array[3]) : ("All Correlations")}</CardTitle>

                </Card>


                </div>


            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        selFunction: state.selFunction,
        selBodyZones: state.selBodyZones,
        selFabrication: state.selFabrication,
        selMaterial: state.selMaterial,
        searchData: state.searchData,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        toggleDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
        updateQuery: (name_array, query_param) => dispatch({type: actionTypes.UPDATE_QUERY, names: name_array, params: query_param})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
