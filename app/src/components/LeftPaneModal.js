import React, { Component } from 'react';
import { connect } from 'react-redux';
import './leftPane.css'
import LeftPaneModalTab from './LeftPaneModalTab';

class LeftPaneModal extends Component {

    render() {
            //console.log(store.getState());

            /*

            */
            console.log(this.props);

            /*
                You have 4 arrays, map each of them to a LeftPaneModalTab element

                onclick for displaying the leftpanemodal

                LeftPaneModal - props - types and subtypes and onclick
            */

            let funcModal = <LeftPaneModalTab type='Function' subtypes={this.props.functions} />;
            let bodyModal = <LeftPaneModalTab type='Body Zones' subtypes={this.props.bodyZones} />;
            let fabModal = <LeftPaneModalTab type='Fabrication' subtypes={this.props.fabrication} />;
            let matModal = <LeftPaneModalTab type='Material' subtypes={this.props.material} />;

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
    }
};

export default connect(mapStateToProps)(LeftPaneModal);