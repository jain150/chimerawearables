import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class Matrix extends Component {

    render() {

            console.log(this.props);
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
                    <Card body inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle>{name_array[0]}</CardTitle>

                          {(bool_array[0]) ? (<CardText style={{color:"#8C3636"}}>Function</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle>{name_array[1]}</CardTitle>

                          {(bool_array[1]) ? (<CardText style={{color:"#8C3636"}}>BodyZones</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%' }}>
                          <CardTitle>{name_array[2]}</CardTitle>

                          {(bool_array[2]) ? (<CardText style={{color:"#8C3636"}}>Fabrication</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{name_array[3]}</CardTitle>

                          {(bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>Material</CardText>) : (<div />)}
                    </Card>
                 </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'16%'}}>
                          <CardTitle>{(bool_array[0] && bool_array[1]) ? (name_array[0] + "+" + name_array[1]) : ("Function + Body Zones")}</CardTitle>

                          {(bool_array[0] && bool_array[1]) ? (<CardText style={{color:"#8C3636"}}>Function + Body Zones</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle>{(bool_array[0] && bool_array[2]) ? (name_array[0] + "+" + name_array[2]) : ("Function + Fabrication")}</CardTitle>

                          {(bool_array[0] && bool_array[2]) ? (<CardText style={{color:"#8C3636"}}>Function + Fabrication</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle>{(bool_array[0] && bool_array[3]) ? (name_array[0] + "+" + name_array[3]) : ("Function + Material")}</CardTitle>

                          {(bool_array[0] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>Function + Material</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle>{(bool_array[1] && bool_array[2]) ? (name_array[1] + "+" + name_array[2]) : ("BodyZones + Fabrication")}</CardTitle>

                          {(bool_array[1] && bool_array[2]) ? (<CardText style={{color:"#8C3636"}}>BodyZones + Fabrication</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'17%'}}>
                          <CardTitle>{(bool_array[1] && bool_array[3]) ? (name_array[1] + "+" + name_array[3]) : ("BodyZones + Material")}</CardTitle>

                          {(bool_array[1] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>BodyZones + Material</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'16%'}}>
                          <CardTitle>{(bool_array[2] && bool_array[3]) ? (name_array[2] + "+" + name_array[3]) : ("Fabrication + Material")}</CardTitle>

                          {(bool_array[2] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>Fabrication + Material</CardText>) :
                          (<div />)}
                    </Card>

                </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{(bool_array[0] && bool_array[1] && bool_array[2]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[2]) : ("Function + BodyZones + Fabrication")}</CardTitle>

                          {(bool_array[0] && bool_array[1] && bool_array[2]) ? (<CardText style={{color:"#8C3636"}}>Function + BodyZones + Fabrication</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{(bool_array[0] && bool_array[1] && bool_array[3]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[3]) : ("Function + BodyZones + Material")}</CardTitle>

                          {(bool_array[0] && bool_array[1] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>Function + BodyZones + Material</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{(bool_array[0] && bool_array[2] && bool_array[3]) ? (name_array[0] + "+" + name_array[2] + "+" + name_array[3]) : ("Function + Fabrication + Material")}</CardTitle>

                          {(bool_array[0] && bool_array[2] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>Function + Fabrication + Material</CardText>) :
                          (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{(bool_array[1] && bool_array[2] && bool_array[3]) ? (name_array[1] + "+" + name_array[2] + "+" + name_array[3]) : ("BodyZones + Fabrication + Material")}</CardTitle>

                          {(bool_array[1] && bool_array[2] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>BodyZones + Fabrication + Material</CardText>) :
                          (<div />)}
                    </Card>
                </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>

                <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                height:'30%'}}>
                      <CardTitle>{(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? (name_array[0] + "+" + name_array[1] + "+" + name_array[2] + "+" + name_array[3]) : ("All Correlations")}</CardTitle>

                      {(bool_array[0] + bool_array[1] && bool_array[2] && bool_array[3]) ? (<CardText style={{color:"#8C3636"}}>All Correlations</CardText>) :
                      (<div />)}
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
    }
};


export default connect(mapStateToProps)(Matrix);
