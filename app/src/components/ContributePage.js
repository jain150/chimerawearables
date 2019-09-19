/* global gapi */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { Dropdown } from 'semantic-ui-react'
import ImageMapper from 'react-image-mapper';
import './contributePage.css';

//import gapi from 'gapi-client';

class ContributePage extends Component {

/*  componentDidMount() {

  gapi.load('client:auth2', () => {
    gapi.client.init({
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
      apiKey: 'AIzaSyBOoFBxxw4w3hphPBGb_P4nKriNBPFf_n4',
      clientId: '1030014197436-1oftnoda9j1qk7qgv0cpjbc625q1qr2k.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    }).then(function () {
      console.log('it worked');
    },function(error) {
    console.log(error);
    console.log("ERROR")
  });
  });
}*/

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
                title: '',
                link: '',
                mainpage: '',
                year: '',
                venue: '',
                fab: '',
                mat: '',
                func: '',
                wearability: '',
                electronicIntegration: '',
                maintainence: '',
                context: '',
                activity: '',
                aesthetic: '',
                resourceCategorization: [],
                source: '',
        };
  }

  onAChange = (event, data) => {
    this.setState({
      wearability: data.value,
    });
  }

  onBChange = (event, data) => {
    this.setState({
      electronicIntegration: data.value,
    });
  }

  onCChange = (event, data) => {
    this.setState({
      maintainence: data.value,
    });
  }

  onDChange = (event, data) => {
    this.setState({
      context: data.value,
    });
  }

  onEChange = (event, data) => {
    this.setState({
      activity: data.value,
    });
  }

  onFChange = (event, data) => {
    this.setState({
      aesthetic: data.value,
    });
  }

  onTitleChange = (event) => {

    this.setState({
      title: event.target.value,
    });
  }

  onLinkChange = (event) => {

    this.setState({
      link: event.target.value,
    });
  }

  onMainpageChange = (event) => {

    this.setState({
      mainpage: event.target.value,
    });
  }

  handleResCatChange = (res) => {

      let index = this.state.resourceCategorization.indexOf(res);
      let temp = this.state.resourceCategorization;
      if (index > -1) {
         temp.splice(index, 1);
      }

      else {
        temp.unshift(res);
      }

      this.setState({
        resourceCategorization: temp,
      });
  }

  handleSourceChange = (source) => {

    if(this.state.source === '' || this.state.source === 'Both') {
      this.setState({
        source: source,
      });
    }

    else if(this.state.source === source) {
      this.setState({
        source: 'Both',
      });
    }

    else {

      if(this.state.source !== source) {
        this.setState({
          source: source,
        });
      }

      else {
        this.setState({
          source: 'Both',
        });
      }
    }
  }

  onYearChange = (event) => {

    this.setState({
      year: event.target.value,
    });
  }

  onVenueChange = (event) => {

    this.setState({
      venue: event.target.value,
    });
  }

  onFabChange = (event, data) => {
    this.setState({
      fab: data.value.toString(),
    });
  }

  onMatChange = (event, data) => {
    this.setState({
      mat: data.value.toString(),
    });
  }

  onFuncChange = (event, data) => {
    this.setState({
      func: data.value.toString(),
    });
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
      }, 225)
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

handleSubmit = () => {

      let temp = Object.assign({}, this.state.resourceCategorization);
      let tempResCat = temp.toString();

      let arr = [];

      arr.push(this.state.title);
      arr.push(this.state.link);
      arr.push(this.state.mainpage);
      arr.push(this.state.year);
      arr.push(this.state.venue);
      arr.push(this.state.fab);
      arr.push(this.state.mat);
      arr.push(this.state.func);
      arr.push(this.state.zone);
      arr.push(this.state.wearability);
      arr.push(this.state.electronicIntegration);
      arr.push(this.state.maintainence);
      arr.push(this.state.context);
      arr.push(this.state.activity);
      arr.push(this.state.aesthetic);
      arr.push(this.state.source);
      arr.push(this.state.tempResat);

      var body = {
      values: arr
      };

    gapi.client.sheets.spreadsheets.values.append({
     spreadsheetId: '1yYtQWLapVdWpoLk7lQ1_dyMn-Nc2IXOHNvHJNna62Kc',
     valueInputOption: 'USER_ENTERED',
     range: "Sheet1!A1:R1",
     resource: body
  }).then((response) => {
    var result = response.result;
    console.log(`${result.updates.updatedCells} cells appended.`)
  }, (error) => {
    console.log(error);
  });



/*
      gapi.client.sheets.spreadsheets.values.append({
       spreadsheetId: '1yYtQWLapVdWpoLk7lQ1_dyMn-Nc2IXOHNvHJNna62Kc',
       valueInputOption: 'USER_ENTERED',
       resource: body
    }).then((response) => {
      var result = response.result;
      console.log(`${result.updates.updatedCells} cells appended.`)
    });


    gapi.client.sheets.spreadsheets.values.append({
   spreadsheetId: spreadsheetId,
   range: range,
   valueInputOption: valueInputOption,
   resource: body
}).then((response) => {
  var result = response.result;
  console.log(`${result.updates.updatedCells} cells appended.`)
});
*/


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

    const numList = [
                        {key:1, text:1, value: 1},
                        {key:3, text:3, value: 3},
                        {key:9, text:9, value: 9}
                    ]

    const funcList = this.props.functionList.map((item) => {

        let temp = { key: item, text: item, value: item};
        return temp;
    });

    return (

      <div className="contributeSplit">

          <div className="contributeForm">

                <div style={{height: "29%", marginTop: "2%"}}>
                    <div style={{height: "40%"}}>
                        <div>Resource Title</div>
                        <Input value={this.state.title} onChange={(event) => this.onTitleChange(event)} style={{ borderRadius: "0px", padding: "0", height: "40%"}} type="text"/>
                    </div>

                    <div style={{display: "flex", marginTop: "1%"}}>

                        <div style={{width: "49%"}}>
                            <div>Resource Link</div>
                            <Input value={this.state.link} onChange={(event) => this.onLinkChange(event)} style={{ borderRadius: "0px", padding: "0", height: "60%"}} type="text"/>
                        </div>

                        <div style={{width: "49%", marginLeft: "2%"}}>
                            <div>Resource Main Page</div>
                            <Input value={this.state.mainpage} onChange={(event) => this.onMainpageChange(event)} style={{ borderRadius: "0px",  padding: "0", height: "60%"}} type="text"/>
                        </div>

                    </div>

                    <div style={{display: "flex", marginTop: "1%"}}>

                        <div style={{width: "49%"}}>
                            <div>Year</div>
                            <Input value={this.state.year} onChange={(event) => this.onYearChange(event)} style={{ borderRadius: "0px",  padding: "0", height: "60%"}} type="text"/>
                        </div>

                        <div style={{width: "49%", marginLeft: "2%"}}>
                            <div>Venue</div>
                            <Input value={this.state.venue} onChange={(event) => this.onVenueChange(event)} style={{ borderRadius: "0px",  padding: "0", height: "60%"}} type="text"/>
                        </div>

                    </div>
                  </div>

                  <div style={{height: "45%", borderTop: "solid", paddingTop: "2%", borderWidth: "thick", marginTop: "5%", display: "flex", textAlign: "center"}}>

                    <div style={{width: "45%"}}>
                              <div style={{height: "30%", marginTop: "2%"}}>
                                  <div>Fabrication (Pick up to 2 that apply)</div>
                                  <Dropdown onChange={this.onFabChange} style={{padding: "0", minHeight: "1%"}} placeholder='Fabrication' fluid multiple selection options={fabList} />
                              </div>

                              <div style={{height: "30%", marginTop: "3%"}}>
                                  <div>Material (Pick up to 3 that apply)</div>
                                  <Dropdown onChange={this.onMatChange} style={{padding: "0", minHeight: "1%"}} placeholder='Material' fluid multiple selection options={matList} />
                              </div>

                              <div style={{height: "30%", marginTop: "3%"}}>
                                  <div>Function (Pick up to 3 that apply)</div>
                                  <Dropdown onChange={this.onFuncChange} style={{padding: "0", minHeight: "1%"}} placeholder='Function' fluid multiple selection options={funcList} />
                              </div>
                    </div>
                    <div style={{marginLeft: "5%", width: "50%", borderLeft: "solid", borderWidth: "thick"}}>


                            <div style={{width: "100%", height: "15%", marginTop: "1%", marginLeft: "3%"}}>
                                <div>Source (Select all that apply)</div>
                                <div style={{display: "flex", height: "100%", fontSize: "105%"}}>
                                    {(this.state.source === "Engineering") ? (<Button onClick={() => this.handleSourceChange('Engineering')} style={{backgroundColor: "#5a6268", textAlign: "center", fontSize: "100%", color: "black", width: "47%"}}>Engineering</Button>) : (<Button onClick={() => this.handleSourceChange('Engineering')} style={{backgroundColor: "white", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Engineering</Button>)}
                                    {(this.state.source === "Fashion") ? (<Button onClick={() => this.handleSourceChange('Fashion')} style={{backgroundColor: "#5a6268", textAlign: "center", color: "black", marginLeft: "6%", width: "47%",fontSize: "100%"}}>Fashion</Button>) : (<Button onClick={() => this.handleSourceChange('Fashion')} style={{backgroundColor: "white", textAlign: "center", color: "black", marginLeft: "6%", width: "47%", fontSize: "100%"}}>Fashion</Button>)}
                                </div>
                            </div>

                            <div style={{width: "100%", height: "65%", marginTop: "12%", marginLeft: "3%"}}>
                                <div>Resource Categorization (Select all that apply)</div>
                                <div style={{display: "flex",  height:"25%",fontSize: "105%"}}>
                                      {(this.state.resourceCategorization.includes("Tutorials")) ? (<Button onClick={() => this.handleResCatChange('Tutorials')} style={{backgroundColor: "#5a6268", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Tutorials</Button>) : (<Button onClick={() => this.handleResCatChange('Tutorials')} style={{backgroundColor: "white", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Tutorials</Button>)}
                                      {(this.state.resourceCategorization.includes("Research")) ? (<Button onClick={() => this.handleResCatChange('Research')} style={{backgroundColor: "#5a6268",  marginLeft: "6%", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Research</Button>) : (<Button onClick={() => this.handleResCatChange('Research')} style={{backgroundColor: "white",  marginLeft: "6%", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Research</Button>)}

                                </div>
                                <div style={{display: "flex", marginTop: "1%", height:"25%", fontSize: "105%"}}>
                                    {(this.state.resourceCategorization.includes("Patent")) ? (<Button onClick={() => this.handleResCatChange('Patent')} style={{backgroundColor: "#5a6268", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Patent</Button>) : (<Button onClick={() => this.handleResCatChange('Patent')} style={{backgroundColor: "white", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Patent</Button>)}
                                    {(this.state.resourceCategorization.includes("Design Concept")) ? (<Button onClick={() => this.handleResCatChange('Design Concept')} style={{backgroundColor: "#5a6268", textAlign: "center", color: "black", marginLeft: "6%", width: "47%", fontSize: "100%"}}>Design Concept</Button>) : (<Button onClick={() => this.handleResCatChange('Design Concept')} style={{backgroundColor: "white", textAlign: "center", color: "black", marginLeft: "6%", width: "47%", fontSize: "100%"}}>Design Concept</Button>)}
                                </div>
                                <div style={{display: "flex", marginTop: "1%", height:"25%", fontSize: "105%"}}>
                                    {(this.state.resourceCategorization.includes("Aesthetics")) ? (<Button onClick={() => this.handleResCatChange('Aesthetics')} style={{backgroundColor: "#5a6268", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Aesthetic</Button>) : (<Button onClick={() => this.handleResCatChange('Aesthetics')} style={{backgroundColor: "white", textAlign: "center", color: "black", width: "47%", fontSize: "100%"}}>Aesthetic</Button>)}
                                </div>
                            </div>

                    </div>

                </div>

                <img src={"ImageDatabase/Icons/Home.png"}
                 alt="" style={{width: '30%', objectFit: "cover", marginLeft: "40%", marginTop: "2%"}}/>



                  {/*<div style={{display: "flex", borderTop: "solid", marginTop: "0.75%"}}>

                      <div style={{width: "49%"}}>
                          <div>Wearability Rating (Select the most appropriate choice)</div>
                          <Dropdown onChange={this.onAChange} style={{padding: "0", minHeight: "1%", height: "75%"}} placeholder='#' fluid selection options={numList} />
                      </div>

                      <div style={{width: "49%", marginLeft: "2%"}}>
                          <div>Electronic Integration (Select the most appropriate choice)</div>
                          <Dropdown onChange={this.onBChange} style={{padding: "0", minHeight: "1%", height: "75%"}} placeholder='#' fluid selection options={numList} />
                      </div>

                  </div>

                  <div style={{display: "flex"}}>

                      <div style={{width: "49%", marginTop: "1.5%"}}>
                          <div style={{fontSize: "97.5%"}}>Maintainence Requirement (Select the most appropriate choice)</div>
                          <Dropdown onChange={this.onCChange} style={{padding: "0", minHeight: "1%", height: "75%"}} placeholder='#' fluid selection options={numList} />
                      </div>

                      <div style={{width: "49%", marginLeft: "2%", marginTop: "1.5%"}}>
                          <div>Context (Select the most appropriate choice)</div>
                          <Dropdown onChange={this.onDChange} style={{padding: "0", minHeight: "1%", height: "75%"}} placeholder='#' fluid selection options={numList} />
                      </div>

                  </div>

                  <div style={{display: "flex"}}>

                      <div style={{width: "49%", marginTop: "1.5%"}}>
                          <div>Activity Obstruction (Select the most appropriate choice)</div>
                          <Dropdown onChange={this.onEChange} style={{padding: "0", minHeight: "1%", height: "75%"}} placeholder='#' fluid selection options={numList} />
                      </div>

                      <div style={{width: "49%", marginLeft: "2%", marginTop: "1.5%"}}>
                          <div>Aesthetic Consideration (Select the most appropriate choice)</div>
                          <Dropdown onChange={this.onFChange} style={{padding: "0", minHeight: "1%", height: "75%"}} placeholder='#' fluid selection options={numList} />
                      </div>

                  </div>*/}



          </div>


          <div className="contributeBody">
            <div  style={{transform: "translate(40%, 15%)", width: "50%"}}>
            <ImageMapper src={img} map={myMap2} width={265 * w} height={400 * h}
               onClick={area => this.handleClicks2(area)}
             />
             <div style={{ fontSize: "smaller", marginLeft: "26%"}}><b>(</b>DOUBLE CLICK FOR</div>
             <div style={{ fontSize: "smaller", marginLeft: "25%"}}>FULL BODY SELECTION<b>)</b></div>
            </div>

             <Button size="lg" onClick={() => this.handleSubmit()} style={{marginTop: "14%", marginLeft: "34%", textAlign: "center"}} color="secondary">Submit</Button>{' '}
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
