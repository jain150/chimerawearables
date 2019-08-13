import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPaneModalTab.css';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import * as actionTypes from '../store/actions';


class LeftPaneModalTab extends Component {


    constructor(props) {
       super(props);

       this.state = {
         curInput: '',
       };
    }

    onSelect = (input, type) => {
        if(type == 'Function') {

            this.setState({
               curInp: input,
            });



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

    /*
        Use state to save current input.
        Use conditional rendering to render the selected input differently
    */

    render() {
            let inp = '';
            let curInp = this.state.curInp;

            inp = this.props.subtypes.map((input) => {

                return (

                  <div style={{background: 'black', color: 'white'}} onClick={() => this.onSelect(input, this.props.type)}
                    className='modalHover'
                    key={input}>
                    <div className="rotate13">
                        {input}
                    </div>
                  </div>
                );
            }

            )
            return (

            <div className='leftPaneModalTabBody'>
                  {inp}
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
