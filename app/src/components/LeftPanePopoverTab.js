import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPanePopoverTab.css';
import { Button, CustomInput, Form, FormGroup, Label } from 'reactstrap';
import { PopoverHeader } from 'reactstrap';
import * as actionTypes from '../store/actions';


class LeftPanePopoverTab extends Component {

    constructor(props) {
        super(props);

        this.state = {

         listArr: this.props.selArr,
         curInp: this.props.selArr[0],
        };
    }

    onClick = (subtype) => {


        let tempArr = [];

        if(this.state.listArr.includes(subtype)) {

            tempArr = [];
        }

        else {
            tempArr.push(subtype);
        }

        this.setState({

            listArr: tempArr,
        });

        this.onSelect(tempArr);
        this.onSelectSubType(subtype, this.props.type);


    }


    onSelect = (tempArr) => {

            //this.props.types and this.state.listArr
            let type = this.props.type;

             if(type === 'Function') {

                 this.props.onSelFunction(tempArr);
             }
             else if(type === 'BodyZones') {
                 this.props.onSelBodyZones(this.state.listArr);
             }
             else if(type === 'Fabrication') {
                 this.props.onSelFabrication(tempArr);
             }
             else {
                 this.props.onSelMaterial(tempArr);
             }

             //this.props.toggle();
    }

    onSelectSubType = (input, type) => {

        if(input === this.state.curInp)
          input = '';
        if(type == 'Function') {

            this.setState({
               curInp: input,
            });

          console.log(input);
        this.props.onSelectFunction(input);
        }
        else if(type == 'BodyZones') {

            this.props.onSelectBodyZones(input);
             this.setState({
               curInp: input,
            });

        }
        else if(type == 'Fabrication') {

            this.props.onSelectFabrication(input);
             this.setState({
               curInp: input,
            });

        }
        else {
            this.props.onSelectMaterial(input);
             this.setState({
               curInp: input,
            });

        }
    };


    render() {

            let inp = this.props.subtypes;

            inp = inp.sort();

            let index = inp.indexOf("All " + this.props.type + "s");
            if (index > -1) {
               inp.splice(index, 1);

            }
            inp.unshift("All " + this.props.type + "s");

            let selArr = this.state.listArr;
            inp = inp.map((input) => {

                return (

                    <div key={this.props.key}>
                     {(selArr.includes(input)) ? (
                       <div onClick={() => this.onClick(input)} className='leftPanePopoverTabBodySelected'
                          name="customRadio"

                          id={input}
                          label={input}>{input}</div>
                        ) : (
                          <div onClick={() => this.onClick(input)} className='leftPanePopoverTabBody'
                          name="customRadio" key={input} id={input}
                                    label={input}>{input}</div>
                        )}
                     </div>


                );
            }
            )
            return (
                <div>
                        <div style={{width: '100%', color: "white", backgroundColor: "black"}}>
                          {inp}
                        </div>
              </div>


            );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelFunction: (value) => dispatch({type: actionTypes.PRE_SELECT_FUNC, value: value}),
        onSelBodyZones: (value) => dispatch({type: actionTypes.PRE_SELECT_BOD, value: value}),
        onSelFabrication: (value) => dispatch({type: actionTypes.PRE_SELECT_FAB, value: value}),
        onSelMaterial: (value) => dispatch({type: actionTypes.PRE_SELECT_MAT, value: value}),

        onSelectFunction: (value) => dispatch({type: actionTypes.SELECT_FUNCTION, val: value}),
        onSelectBodyZones: (value) => dispatch({type: actionTypes.SELECT_BODYZONES, val: value}),
        onSelectFabrication: (value) => dispatch({type: actionTypes.SELECT_FABRICATION, val: value}),
        onSelectMaterial: (value) => dispatch({type: actionTypes.SELECT_MATERIAL, val: value}),

    }
};

export default connect(null, mapDispatchToProps)(LeftPanePopoverTab);
