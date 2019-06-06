import React, { Component } from 'react';
import './App.css';
import LeftPane from './components/LeftPane';
import Matrix from './components/Matrix';
import LeftPaneModal from './components/LeftPaneModal';


class App extends Component {

    render() {
        //console.log(store.getState());
        return (
         <div className="layout">
            <LeftPane />
            <LeftPaneModal />
            <Matrix />
         </div>
    );
  }
}

export default App;
