import React, { Component } from 'react';
import './leftPane.css'
import LeftPaneTab from './LeftPaneTab';

class LeftPane extends Component {

    render() {

            let my_array = [];
                for(let i = 0; i < 4; i++)
            my_array.push(i + 1)

           let listItems = '';
           listItems = my_array.map((listItem) => {
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

export default LeftPane;