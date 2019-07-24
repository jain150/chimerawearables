import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPaneTab.css'

import LeftPanePopoverTab from './LeftPanePopoverTab';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

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

            let backgroundCol = "rgb(172, 216, 206)";
            let borderCol = "rgb(110, 169, 155)";

            if(this.props.name === "Material") {
                backgroundCol = "rgb(254, 205, 102)";
                borderCol = "rgb(254, 172, 0)";
            }

            else if(this.props.name === "Fabrication") {
              backgroundCol = "rgb(133, 194, 219)";
              borderCol = "rgb(0, 181, 254)";
            }

            //console.log(store.getState());
            return (

             <div id={'Popover-'+this.props.name} style={{ backgroundColor: backgroundCol, borderColor: borderCol }} className="leftPaneTabBody">

                 <div className="rotate5 move">{this.props
                 .name}
                 </div>


                 <img id="image" src={"ImageDatabase/Icons/" + this.props.name + ".png"}
                  alt="" className="imgStyle"/>




                         <UncontrolledPopover style={{ backgroundColor: "black"}} hideArrow={true} modifiers={{offset: '-5vw'}} trigger="legacy" target={'Popover-'
                         +

                         this
                         .props
                         .name}>

                              <PopoverHeader style={{color: "white", backgroundColor: "black", transform: "translateX(-4.8%)"}}>{this.props.name}</PopoverHeader>
                               <PopoverBody style={{padding: '0', color: "#A7AFBA", backgroundColor: "black", transform: "translateX(-4.8%)"}}><LeftPanePopoverTab
                                                        type={this.props.name}
                                                        subtypes={arr}
                                                         selArr={selArr}
                                                         toggle={this.toggle}
                                                         key={this.props.key}/>
                          </PopoverBody>

                         </UncontrolledPopover>

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
