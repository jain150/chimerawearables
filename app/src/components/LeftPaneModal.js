import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPane.css'
import LeftPaneModalTab from './LeftPaneModalTab';

import { Button, Fade } from 'reactstrap';

class LeftPaneModal extends Component {


    constructor(props) {

        super(props);

        this.state = {

         listArr: this.props.selArr,
        };
    }

    render() {

            let funcModal = <LeftPaneModalTab style={{height: '25%'}}
                                        type='Function'
                                        subtypes={this.props.functions} />;

            let bodyModal = <LeftPaneModalTab style={{height: '25%'}}
             type='BodyZones'
            subtypes={this.props.bodyZones} />;

            let fabModal =  <LeftPaneModalTab style={{height: '25%'}}
            type='Fabrication'
            subtypes={this.props.fabrication} />;

            let matModal = <LeftPaneModalTab style={{height: '25%'}}
            type='Material'
            subtypes={this.props.material} />;

            return (


            <div className="leftPaneModal">

                   {funcModal}
                   {fabModal}
                   {matModal}
            </div>

            );
    }
}

const mapStateToProps = state => {

    console.log(state.arrFunc);
    return {
        functions: state.arrFunc,
        bodyZones: state.arrBod,
        fabrication: state.arrFab,
        material: state.arrMat,

    }
};

export default connect(mapStateToProps)(LeftPaneModal);
