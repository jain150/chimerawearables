import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPane.css'
import LeftPaneModalTab from './LeftPaneModalTab';

import { Button, Fade } from 'reactstrap';

class LeftPaneModal extends Component {

    render() {



            let funcModal = <Fade style={{height: '25%'}} in={this.props.showFunc}><LeftPaneModalTab
            type='Function'
            subtypes={this.props.functions} /></Fade>;

            let bodyModal = <Fade id='2' style={{height: '25%'}} in={this.props.showBod}><LeftPaneModalTab
             type='BodyZones'
            subtypes={this.props.bodyZones} /></Fade>;

            let fabModal = <Fade id='3' style={{height: '25%'}} in={this.props.showFab}><LeftPaneModalTab
            type='Fabrication'
            subtypes={this.props.fabrication} /></Fade>;

            let matModal = <Fade id='4' style={{height: '25%'}} in={this.props.showMat}><LeftPaneModalTab
            type='Material'
            subtypes={this.props.material} /></Fade>;

            return (


            <div className="leftPaneModal">
                {funcModal}
                {bodyModal}
                {fabModal}
                {matModal}
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
    }
};

export default connect(mapStateToProps)(LeftPaneModal);