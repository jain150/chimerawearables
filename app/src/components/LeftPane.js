import React, { Component } from 'react';
import { connect } from 'react-redux';

import './leftPane.css'
import LeftPaneTab from './LeftPaneTab';

import * as actionTypes from '../store/actions';

class LeftPane extends Component {

    onClick = (type) => {


         if(type === 'Function') {

             this.props.onShowFunction();
         }
         else if(type === 'BodyZones') {
             this.props.onShowBodyZones();
         }
         else if(type === 'Fabrication') {
             this.props.onShowFabrication();
         }
         else {
             this.props.onShowMaterial();
         }
    };

    render() {

           let listItems = '';
           listItems = this.props.categories.map((listItem) => {
                return (
                    <LeftPaneTab key={listItem} name={listItem} clicked={this.onClick} />
                )
            });

            return (

             <div className="leftPaneBody">
                {listItems}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onShowFunction: () => dispatch({type: actionTypes.SHOW_FUNC}),
        onShowBodyZones: () => dispatch({type: actionTypes.SHOW_BOD}),
        onShowFabrication: () => dispatch({type: actionTypes.SHOW_FAB}),
        onShowMaterial: () => dispatch({type: actionTypes.SHOW_MAT}),

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);