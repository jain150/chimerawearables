import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPaneTab.css'

import LeftPanePopoverTab from './LeftPanePopoverTab';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class LeftPaneTab extends Component {

    constructor(props) {
       super(props);



       this.state = {
         popoverFunc: false,
         popoverBod: false,
         popoverFab: false,
         popoverMat: false,
         popoverOpen: false,
       };
    }

     toggle = (name) => {
       this.setState({
         popoverOpen: !this.state.popoverOpen
       });
     }


   render() {


            let type = this.props.name;

            let arr = [];
            let selArr = [];

            if(type === 'Function') {
                arr = this.props.functions;
                selArr = this.props.arrFunc;
            }
            else if(type === 'BodyZones') {
                arr = this.props.bodyZones;
                selArr = this.props.arrBod;
            }
            else if(type === 'Fabrication') {
                arr = this.props.fabrication;
                selArr = this.props.arrFab;
            }
            else {
                arr = this.props.material;
                selArr = this.props.arrMat;
            }


            //console.log(store.getState());
            return (

             <div className="leftPaneTabBody">

                 <div className="rotate move" id={'Popover-'+this.props.name}>{this.props
                 .name}</div>

                 <Popover style={{width: '150px'}} placement='right' isOpen={this.state.popoverOpen} target={'Popover-'
                 +

                 this
                 .props
                 .name}
                 toggle={this.toggle}>
                       <PopoverHeader>{this.props.name}</PopoverHeader>
                       <PopoverBody style={{padding: '0'}}><LeftPanePopoverTab
                                                type={this.props.name}
                                                subtypes={arr}
                                                 selArr={selArr}
                                                 toggle={this.toggle}/>
                  </PopoverBody>
                 </Popover>

            </div>

        );
   }
}

const mapStateToProps = state => {
    return {
        functions: state.functions,
        bodyZones: state.bodyZones,
        fabrication: state.fabrication,
        material: state.material,

        showFunc: state.showFunc,
        showBod: state.showBod,
        showFab: state.showFab,
        showMat: state.showMat,

        arrFunc: state.arrFunc,
        arrBod: state.arrBod,
        arrFab: state.arrFab,
        arrMat: state.arrMat,
    }
};

export default connect(mapStateToProps)(LeftPaneTab);
