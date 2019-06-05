import React, { Component } from 'react';
import './App.css';
import LeftPane from './components/LeftPane';
import Matrix from './components/Matrix';


class App extends Component {

    render() {
        //console.log(store.getState());
        return (
         <div className="layout">
            <LeftPane />
            <Matrix />
         </div>
    );
  }
}

export default App;
