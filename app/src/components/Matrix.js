import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'

import { Card, Button, CardTitle, CardText } from 'reactstrap';

class Matrix extends Component {

    render() {
            //console.log(store.getState());


            let isOutFunc = false;

            let name_array = [];
            name_array.push('Function');
            name_array.push('BodyZones');
            name_array.push('Fabrication');
            name_array.push('Material');


            if(this.props.selFunction === null)
                isOutFunc = true;

            let isOutBod = false;
            if(this.props.selBodyZones === null)
                isOutBod = true;


            let isOutFab = false;
            if(this.props.selFabrication === null)
                isOutFab = true;


            let isOutMat = false;
            if(this.props.selMaterial === null)
                isOutMat = true;

            let bool_array = [];
            bool_array.push(isOutFunc);
            if(!isOutFunc)
                name_array[0] = this.props.selFunction;

            bool_array.push(isOutBod);
            if(!isOutFunc)
                name_array[1] = this.props.selBodyZones;

            bool_array.push(isOutFab);
            if(!isOutFunc)

                name_array[2] = this.props.selFabrication;
            bool_array.push(isOutMat);
            if(!isOutFunc)
                name_array[3] = this.props.selMaterial;

            let outFuncBod = '';
            let isOutFuncBod = false;


            if(this.props.selFunction === null || this.props.selBodyZones === null) {

                 outFuncBod = 'Function + Body Zones';
                 isOutFuncBod = true;


            }
            else {
                outFuncBod = this.props.selFunction + "+" + this.props.selBodyZones;
            }

            console.log(name_array);

            return (

             <div className="matrixBody">
                <div style={{marginTop: '10px', marginLeft: '30px'}}>
                    <Card body inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle>{name_array[0]}</CardTitle>

                          {(!bool_array[0]) ? (<CardText style={{color:"#1249A8"}}>Function</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor:
                    '#1249A8', width:'auto', height:'20%' }}>
                          <CardTitle>{name_array[1]}</CardTitle>

                          {(!bool_array[1]) ? (<CardText style={{color:"#1249A8"}}>Body Zones</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%' }}>
                          <CardTitle>{name_array[2]}</CardTitle>

                          {(!bool_array[2]) ? (<CardText style={{color:"#1249A8"}}>Fabrication</CardText>) : (<div />)}
                    </Card>

                    <Card body inverse style={{ backgroundColor: '#333', borderColor: '#1249A8', width:'auto',
                    height:'20%'}}>
                          <CardTitle>{name_array[3]}</CardTitle>

                          {(!bool_array[3]) ? (<CardText style={{color:"#1249A8"}}>Material</CardText>) : (<div />)}
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