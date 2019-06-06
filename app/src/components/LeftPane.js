import React, { Component } from 'react';
import { connect } from 'react-redux';

import './leftPane.css'
import LeftPaneTab from './LeftPaneTab';

class LeftPane extends Component {

    render() {

           let listItems = '';
           listItems = this.props.categories.map((listItem) => {
                return (
                    <LeftPaneTab name={listItem} />
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


export default connect(mapStateToProps)(LeftPane);