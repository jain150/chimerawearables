import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class Matrix extends Component {

    render() {
            //console.log(store.getState());

            let outFunc = '';
            let isOutFunc = false;

            if(this.props.selFunction === null) {
                outFunc = 'Function'
                isOutFunc = true;
            }
            else
                outFunc = this.props.selFunction;



            let outBod = '';
            let isOutBod = false;

            if(this.props.selBodyZones === null) {
                outBod = 'Body Zones'
                isOutBod = true;
            }
            else
                outBod = this.props.selBodyZones;



            let outFab = '';
            let isOutFab = false;

            if(this.props.selFabrication === null) {
                outFab = 'Fabrication'
                isOutFab = true;
            }
            else
                outFab = this.props.selFabrication;


            let outMat = '';
            let isOutMat = false;

            if(this.props.selMaterial === null) {
                outMat = 'Material'
                isOutMat = true;
            }
            else
                outMat = this.props.selMaterial;

            let outFuncBod = '';
            let isOutFuncBod = false;

            if(this.props.selFunc !== null && this.props.selBodyZones !== null) {
                outFuncBod = this.props.selFunction + "+" + this.props.selBodyZones;

            }
            else {
                 outFuncBod = 'Function + Body Zones';
                 isOutFuncBod = true;
            }


            console.log(this.props.selFunction);
            console.log(this.props.selBodyZones);
            console.log(outFuncBod);
            return (

             <div className="matrixBody">
                <div style={{marginTop: '10px', marginLeft: '30px'}}>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle>{outFunc}</CardTitle>

                          {(!isOutFunc) ? (<CardText style={{color:"#1249A8"}}>Function</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle>{outBod}</CardTitle>

                          {(!isOutBod) ? (<CardText style={{color:"#1249A8"}}>Body Zones</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%' }}>
                          <CardTitle>{outFab}</CardTitle>

                          {(!isOutFab) ? (<CardText style={{color:"#1249A8"}}>Fabrication</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{outMat}</CardTitle>

                          {(!isOutMat) ? (<CardText style={{color:"#1249A8"}}>Material</CardText>) : (<div />)}
                    </Card>
                 </div>

                <div style={{marginTop: '10px', marginLeft: '30px'}}>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{outFuncBod}</CardTitle>

                          {(!isOutFuncBod) ? (<CardText style={{color:"#1249A8"}}>Function + Body Zones</CardText>) :
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