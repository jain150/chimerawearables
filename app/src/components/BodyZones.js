import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bodyZones.css'
import * as actionTypes from '../store/actions';
import ImageMapper from 'react-image-mapper';
import ColCharts from './ColCharts'
import BodyChart from './BodyChart'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class BodyZones extends Component {

  constructor(props) {

      super(props);

        this.state = {
          zone: 'none',
          modal: false
        };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
      }
   }
	}

    render() {

      let img = "ImageDatabase/HumanBody/Androgynous.png";

      if(this.state.zone === 'none')
        img = "ImageDatabase/HumanBody/Androgynous.png";

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

      let myMap = {
          name: "my-map",
          areas: [
          {name: "Head", shape: "rect", coords: [70, 0, 110, 57], fillColor: "transparent"},
          {name: "Chest", shape: "rect", coords: [53, 57, 90, 164], fillColor: "transparent"},
          {name: "Back", shape: "rect", coords: [90, 57, 127, 164], fillColor: "transparent"},
          {name: "Pelvic Region", shape: "rect", coords: [50, 168, 130, 214], fillColor: "transparent"},
          {name: "Legs", shape: "rect", coords: [50, 214, 130, 368], fillColor: "transparent"},
          {name: "Feet", shape: "rect", coords: [45, 368, 135, 400], fillColor: "transparent"},

          {name: "Arms", shape: "rect", coords: [22, 67, 53, 174], fillColor: "transparent"},
          {name: "Arms", shape: "rect", coords: [127, 67, 158, 174], fillColor: "transparent"},

          {name: "Wrist and Hand", shape: "rect", coords: [0, 174, 30, 215], fillColor: "transparent"},
          {name: "Wrist and Hand", shape: "rect", coords: [148, 174, 178, 215], fillColor: "transparent"}
          ]
      }

            const closeBtn = <Button onClick={this.toggle} color="secondary">{"Close (X)"}</Button>

            return (
             <div className="container">
                 <div style={{transform: "translate(-5%, 20%)"}}>
                       <ImageMapper src={img} map={myMap} width={225} height={400}
                        	onClick={area => this.clicked(area)}
                        />
                        <div style={{marginTop: "10%", color: "white", fontWeight: "600", fontSize: "small"}}>
                            <div>CLICK ON THE</div>
                            <div>BODY ZONES SELECTION</div>
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
