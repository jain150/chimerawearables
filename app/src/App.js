import React, { Component } from 'react';
import './App.css';
import leftPane from './components/leftPane';
import matrix from './components/matrix';


class App extends Component {

    /*
            Make two subcomponents. The left pane component and the centre

     */

    render() {
        //console.log(store.getState());
        return (
         <div>
            <leftPane />
            <matrix />
         </div>
    );
  }
}

export default App;
