import React, { Component } from 'react';
import './leftPaneTab.css'

class LeftPaneTab extends Component {

    render() {
            //console.log(store.getState());
            return (

             <div className="leftPaneTabBody">
                 <div className="rotate move">{this.props.name}</div>
            </div>

        );
    }
}

export default LeftPaneTab;