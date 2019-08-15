import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './bodyZones.css'
import * as actionTypes from '../store/actions';
import ImageMapper from 'react-image-mapper';
import ContributePage from './ContributePage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BodyZones extends Component {

  constructor(props) {

      super(props);

        this.state = {
          zone: 'none',
          modal: false,
          modal2: false,
        };
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
      }, 325)
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

      let img = "ImageDatabase/HumanBody/Androgynous.png";

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
          {name: "Head", shape: "rect", coords: [93 * w, 0 * h, 133 * w, 57 * h], fillColor: "transparent"},
          {name: "Chest", shape: "rect", coords: [83 * w, 60 * h, 113 * w, 180 * h], fillColor: "transparent"},
          {name: "Back", shape: "rect", coords: [113 * w, 60 * h, 143 * w, 180 * h], fillColor: "transparent"},
          {name: "Pelvic Region", shape: "rect", coords: [73 * w, 168 * h, 153 * w, 214 * h], fillColor: "transparent"},
          {name: "Legs", shape: "rect", coords: [73 * w, 214 * h, 153 * w, 368 * h], fillColor: "transparent"},
          {name: "Feet", shape: "rect", coords: [58 * w, 368 * h, 148 * w, 400 * h], fillColor: "transparent"},

          {name: "Arms", shape: "rect", coords: [43 * w, 67 * h, 83 * w, 174 * h], fillColor: "transparent"},
          {name: "Arms", shape: "rect", coords: [143 * w, 67 * h, 171 * w, 170 * h], fillColor: "transparent"},

          {name: "Wrist and Hand", shape: "rect", coords: [28 * w, 174 * h, 63 * w, 215 * h], fillColor: "transparent"},
          {name: "Wrist and Hand", shape: "rect", coords: [158 * w, 174 * h, 193 * w, 215 * h], fillColor: "transparent"}
          ]
      }

        const closeBtn = <Button onClick={this.toggle} color="secondary">{"Close (X)"}</Button>
        const closeBtn2 = <Button onClick={this.toggle2} color="secondary">{"Close (X)"}</Button>
            return (
             <div className="container">
                <div style={{height: "10%", display: "flex", color: "white"}}>

                    <div className="contribute" style={{marginTop: "7%", width: "50%", fontSize: "110%"}} onClick={this.toggle}>CONTRIBUTE</div>
                    <Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader close={closeBtn} style={{backgroundColor: "black", color: "white", height: "10%"}} toggle={this.toggle}>Contribute</ModalHeader>

                      <ModalBody style={{backgroundColor: "black", overflowY: "auto", height: "90%", width: "100%"}}>

                            <ContributePage />

                      </ModalBody>
                    </Modal>

                    <div className="contact" style={{marginTop: "7%", width: "50%", fontSize: "110%"}} onClick={this.toggle2}>CONTACT US</div>
                    <Modal style={{maxWidth: '100%', margin: "0%", maxHeight: '100%', width: '100%', height: '100%'}} isOpen={this.state.modal2} toggle={this.toggle2}>
                      <ModalHeader close={closeBtn2} style={{backgroundColor: "black", color: "white", height: "10%"}} toggle={this.toggle2}>Contas Us</ModalHeader>

                      <ModalBody style={{backgroundColor: "black", overflowY: "auto", height: "90%", width: "100%"}}>

                      <div style={{width: "45%", marginLeft: "1%", color: "white"}}>

                        <div>Name</div>
                        <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>
                        <div>Email Address</div>
                        <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>
                        <div>Subject</div>
                        <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>
                        <div>Message</div>
                        <Input style={{ borderRadius: "0px",  padding: "0", height: "15vh"}} type="text"/>

                      </div>

                      </ModalBody>
                    </Modal>

                </div>
                 <div style={{transform: "translate(0%, 8%)"}}>
                       <ImageMapper src={img} map={myMap} width={265 * w} height={400 * h}
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

const mapDispatchToProps = dispatch => {
    return {
        onSelectBodyZones: (value) => dispatch({type: actionTypes.SELECT_BODYZONES, val: value}),
    }
};

export default connect(null, mapDispatchToProps)(BodyZones);
