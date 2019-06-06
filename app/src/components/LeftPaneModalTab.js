import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPaneModalTab.css';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import * as actionTypes from '../store/actions';


class LeftPaneModalTab extends Component {

    onSelect = (input, type) => {

        console.log(input)

        if(type === 'Function') {

            this.props.onSelectFunction(input);
        }
        else if(type === 'Body Zones') {
            this.props.onSelectBodyZones(input);
        }
        else if(type === 'Fabrication') {
            this.props.onSelectFabrication(input);
        }
        else {
            this.props.onSelectMaterial(input);
        }

    };

    render() {
            //console.log(store.getState());

            //onSelect in custom input, dispatch an action that updates the corresponding selected balye


            console.log(this.props.type);
            let inp = '';

            inp = this.props.subtypes.map((input) => {

                console.log(input)
                return (
                    <CustomInput type="radio" name="customRadio" key={input} id={input} label={input} onClick={() =>
                    this
                    .onSelect(input, this.props.type)}/>
                );
            }
            )
            return (

            <div className='leftPaneModalTabBody'>
                <FormGroup>
                    <Label for="exampleCheckbox">{this.props.type}</Label>
                        <div className='leftPaneModalTabScroll'>
                          {inp}
                         </div>
                 </FormGroup>
            </div>
            );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onSelectFunction: (value) => dispatch({type: actionTypes.SELECT_FUNCTION, val: value}),
        onSelectBodyZones: (value) => dispatch({type: actionTypes.SELECT_BODYZONES, val: value}),
        onSelectFabrication: (value) => dispatch({type: actionTypes.SELECT_FABRICATION, val: value}),
        onSelectMaterial: (value) => dispatch({type: actionTypes.SELECT_MATERIAL, val: value}),

    }
};

export default connect(null, mapDispatchToProps)(LeftPaneModalTab);