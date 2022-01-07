import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './bodyZones.css'
import * as actionTypes from '../store/actions';
import ImageMapper from 'react-image-mapper';
import ContributePage from './ContributePage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Tabletop from 'tabletop';

const SHEET_ID = '19SNEbgmJqzFkXajdTnCDN5S6-PHmqFIGoN_MCFeOMcc';
const ACCESS_TOKEN = 'AIzaSyBhtelk0uYpfhyFPHF6VRx9_V7AgFHTsNk';
class BodyZones extends Component {

  constructor(props) {

      super(props);

        this.state = {
          zone: 'none',
          modal: false,
          modal2: false,
          modal3: false,
          nameitems: [],
        };
  }

  componentDidMount() {

    
    



}

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggle2 = () => {
    this.setState(prevState => ({
      modal2: !prevState.modal2
    }));
  }
  toggle3 = () => {
    this.setState(prevState => ({
      modal3: !prevState.modal3
    }));
  }
  componentWillMount = props => {
    this.clickTimeout = null
  }

  handleClicks = (area) => {
    if (this.clickTimeout !== null) {
      this.doubleClicked("Full Body")
      clearTimeout(this.clickTimeout)
      this.clickTimeout = null
    } else {

      this.clickTimeout = setTimeout(()=>{
      this.clicked(area)
      clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }, 225)
    }
  }

  doubleClicked = (area) => {

    this.setState({
      zone: area
    });

    this.props.onSelectBodyZones(area);
  }

  clicked = (area) => {

    if(this.state.name === 'none') {

      this.setState({
        zone: area.name
      });

      this.props.onSelectBodyZones(area.name);
    }

    else {

      if(area.name != this.state.zone) {

        this.setState({
          zone: area.name
        });

        this.props.onSelectBodyZones(area.name);
      }

      else {
        this.setState({
          zone: 'none'
        });

          this.props.onSelectBodyZones('');
      }
   }
	}

    render() {
      const namefinalitems = [];

      let sheet1Data = this.props.searchData
      let names = [];
      for(let i = 0; i < sheet1Data.length; i++) {
        names.push("<h4>&nbsp;&nbsp;&nbsp;&nbsp;"+sheet1Data[i]["Reference Name"] +"</h4>"+ "<h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        + sheet1Data[i]["AUTHORS"] + "</h6>")
      }

      let img = "ImageDatabase/HumanBody/Androgynous.png";
      
      for (const [index, value] of names.entries()) {
        namefinalitems.push(<li style={{padding: "5px 5px"}} key={index}><span dangerouslySetInnerHTML={{__html:value}}></span></li>)
      }
      if(this.state.zone === 'Full Body')
        img = "ImageDatabase/HumanBody/Androgynous_fullbody.png";

      else if(this.state.zone === 'Head')
        img = "ImageDatabase/HumanBody/Androgynous_head.png";

      else if(this.state.zone === 'Chest')
        img = "ImageDatabase/HumanBody/Androgynous_chest.png";

      else if(this.state.zone === 'Back')
        img = "ImageDatabase/HumanBody/Androgynous_back.png";

      else if(this.state.zone === 'Pelvic Region')
        img = "ImageDatabase/HumanBody/Androgynous_pelvicregion.png";

      else if(this.state.zone === 'Legs')
        img = "ImageDatabase/HumanBody/Androgynous_legs.png";

      else if(this.state.zone === 'Feet')
        img = "ImageDatabase/HumanBody/Androgynous_feet.png";

      else if(this.state.zone === 'Arms')
        img = "ImageDatabase/HumanBody/Androgynous_arm.png";

      else if(this.state.zone === 'Wrist and Hand')
        img = "ImageDatabase/HumanBody/Androgynous_handnwrist.png";



        let w = window.innerWidth / 1280
        let h = window.innerHeight / 610


      let myMap = {
          name: "my-map",
          areas: [
          {name: "Head", shape: "rect", coords: [93 * w, 0 * h, 140 * w, 57 * h], fillColor: "transparent"},
          {name: "Chest", shape: "rect", coords: [83 * w, 60 * h, 120 * w, 180 * h], fillColor: "transparent"},
          {name: "Back", shape: "rect", coords: [120 * w, 60 * h, 152 * w, 180 * h], fillColor: "transparent"},
          {name: "Pelvic Region", shape: "rect", coords: [73 * w, 168 * h, 153 * w, 214 * h], fillColor: "transparent"},
          {name: "Legs", shape: "rect", coords: [73 * w, 214 * h, 153 * w, 368 * h], fillColor: "transparent"},
          {name: "Feet", shape: "rect", coords: [58 * w, 368 * h, 165 * w, 400 * h], fillColor: "transparent"},

          {name: "Arms", shape: "rect", coords: [43 * w, 67 * h, 83 * w, 174 * h], fillColor: "transparent"},
          {name: "Arms", shape: "rect", coords: [152 * w, 67 * h, 185 * w, 170 * h], fillColor: "transparent"},

          {name: "Wrist and Hand", shape: "rect", coords: [28 * w, 174 * h, 63 * w, 215 * h], fillColor: "transparent"},
          {name: "Wrist and Hand", shape: "rect", coords: [165 * w, 174 * h, 206 * w, 215 * h], fillColor: "transparent"}
          ]
      }

            return (
             <div className="container">
                
                
                 <div style={{transform: "translate(0%, 8%)"}}>
                       <ImageMapper strokeColor="transparent" src={img} map={myMap} width={265 * w} height={400 * h}
                        	onClick={area => this.handleClicks(area)}
                        />
                        <div style={{marginTop: "10%", transform: "translateX(-3%)", color: "white", fontWeight: "600", fontSize: "small"}}>
                            <div>CLICK TO SELECT</div>
                            <div>BODY ZONES</div>
                            <div style={{ fontSize: "smaller"}}><b>(</b>DOUBLE CLICK FOR</div>
                            <div style={{ fontSize: "smaller"}}>FULL BODY SELECTION<b>)</b></div>
                        </div>
                  </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
  return {
      searchData: state.searchData,
  }
};

const mapDispatchToProps = dispatch => {
    return {
        onSelectBodyZones: (value) => dispatch({type: actionTypes.SELECT_BODYZONES, val: value}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyZones);
