import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css'
import * as actionTypes from '../store/actions';
import {Alert} from 'reactstrap';


class HomePage extends Component {

    render() {

      return (
      <div>
        <img id="image" src={"http://127.0.0.1:8087/ImageDatabase/Icons/Home.png"} alt=""
         style={{height: '24vh', width: '32vw', objectFit: 'cover', transform: "translate(35vw, 20vh)"}}/>
         <Alert color="success" style={{width: "50vw", marginLeft: "25vw", top: "20vh"}}>
            <p>
              Welcome to our interactive search engine for Wearables. Press start to enter.
            </p>
         </Alert>
         <div className="containerHome">
         <img onClick={this.props.toggle} id="image" src={"http://127.0.0.1:8087/ImageDatabase/Icons/Start.png"} alt=""
          style={{height: '30vh', width: '12vw',transform: "translate(44vw, 20vh)",
           borderStyle: "solid", borderColor: "#bdb9b9", borderWidth: "medium"}}/>
          </div>
      </div>
    );
  }
}


export default HomePage;
