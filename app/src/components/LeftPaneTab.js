import React, { Component } from 'react';
import './leftPaneTab.css'

class LeftPaneTab extends Component {

    render() {
            //console.log(store.getState());
            return (

             <div className="leftPaneTabBody">
                 <h4>{this.props.name}</h4>
            </div>

        );
    }
}

export default LeftPaneTab;