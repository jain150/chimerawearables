import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react'
import ImageMapper from 'react-image-mapper';
import './contributePage.css'



class ContributePage extends Component {

  constructor(props) {

      super(props);

        this.toggleFab = this.toggleFab.bind(this);
        this.toggleMat = this.toggleMat.bind(this);
        this.toggleFunc = this.toggleFunc.bind(this);

        this.state = {

                dropdownOpenFab: false,
                dropdownOpenMat: false,
                dropdownOpenFunc: false,
                zone: 'none',
        };
  }

  handleClicks2 = (area) => {
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

  }

  clicked = (area) => {

    if(this.state.zone === 'none') {

      this.setState({
        zone: area.name
      });

    }

    else {

      if(area.name != this.state.zone) {

        this.setState({
          zone: area.name
        });


      }

      else {
        this.setState({
          zone: 'none'
        });

      }
    }
  }

  toggleFab() {

    this.setState(prevState => ({
      dropdownOpenFab: !prevState.dropdownOpenFab,
    }));
 }

 toggleMat() {

   this.setState(prevState => ({
     dropdownOpenMat: !prevState.dropdownOpenMat,
   }));
 }

 toggleFunc() {

   this.setState(prevState => ({
     dropdownOpenFunc: !prevState.dropdownOpenFunc,
   }));
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


    let w = window.innerWidth / 1280;
    let h = window.innerHeight / 610;

    let myMap2 = {
        name: "my-map2",
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



    const fabList = this.props.fabricationList.map((item) => {

        let temp = { key: item, text: item, value: item};
        return temp;
    });

    const matList = this.props.materialList.map((item) => {

        let temp = { key: item, text: item, value: item};
        return temp;
    });

    const funcList = this.props.functionList.map((item) => {

        let temp = { key: item, text: item, value: item};
        return temp;
    });

    return (

      <div className="contributeSplit">

          <div className="contributeForm">

                  <div>
                      <div>Resource Title</div>
                      <Input style={{ borderRadius: "0px", padding: "0", height: "5%"}} type="text"/>
                  </div>

                  <div style={{display: "flex"}}>

                      <div style={{width: "47%"}}>
                          <div>Resource Link</div>
                          <Input style={{ borderRadius: "0px", padding: "0", height: "50%"}} type="text"/>
                      </div>

                      <div style={{width: "47%", marginLeft: "6%"}}>
                          <div>Resource Main Page</div>
                          <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>
                      </div>

                  </div>

                  <div style={{display: "flex"}}>

                      <div style={{width: "47%"}}>
                          <div>Year</div>
                          <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>
                      </div>

                      <div style={{width: "47%", marginLeft: "6%"}}>
                          <div>Venue</div>
                          <Input style={{ borderRadius: "0px",  padding: "0", height: "50%"}} type="text"/>
                      </div>

                  </div>

                  <div>
                      <div>Fabrication (Pick up to 2 appropriate fabrication methods mentioned in the resource. If there are none, please leave this section blank)</div>
                      <Dropdown style={{padding: "0", minHeight: "1%"}} placeholder='Fabrication' fluid multiple selection options={fabList} />
                  </div>

                  <div>
                      <div>Material (Pick up to 3 appropriate materials mentioned in the resource. If there are none, please leave this section blank)</div>
                      <Dropdown style={{padding: "0", minHeight: "1%"}} placeholder='Material' fluid multiple selection options={matList} />
                  </div>

                  <div>
                      <div>Function (Pick up to 3 appropriate functions mentioned in the resource. If there are none, please leave this section blank)</div>
                      <Dropdown style={{padding: "0", minHeight: "1%"}} placeholder='Function' fluid multiple selection options={funcList} />
                  </div>



          </div>


          <div className="contributeBody">
          <div  style={{transform: "translate(40%, 20%)", width: "50%"}}>
          <ImageMapper src={img} map={myMap2} width={265 * w} height={400 * h}
             onClick={area => this.handleClicks2(area)}
           />
          </div>
          </div>

      </div>
    )

  }
}

const mapStateToProps = state => {
    return {

        fabricationList: state.fabrication,
        materialList: state.material,
        functionList: state.functions,
    }
};

export default connect(mapStateToProps)(ContributePage);
