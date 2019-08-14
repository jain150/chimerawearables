import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions';
import { ButtonDropdown, Progress, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
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
        };
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


    return (

      <div className="contributeSplit">

          <div className="contributeForm">

                  <div>
                      <div>Resource Title</div>
                      <Input style={{ borderRadius: "0px"}} type="text"/>
                  </div>

                  <div style={{display: "flex"}}>

                      <div style={{width: "47%"}}>
                          <div>Resource Link</div>
                          <Input style={{ borderRadius: "0px"}} type="text"/>
                      </div>

                      <div style={{width: "47%", marginLeft: "6%"}}>
                          <div>Resource Main Page</div>
                          <Input style={{ borderRadius: "0px"}} type="text"/>
                      </div>

                  </div>

                  <div style={{display: "flex"}}>

                      <div style={{width: "47%"}}>
                          <div>Year</div>
                          <Input style={{ borderRadius: "0px"}} type="text"/>
                      </div>

                      <div style={{width: "47%", marginLeft: "6%"}}>
                          <div>Venue</div>
                          <Input style={{ borderRadius: "0px"}} type="text"/>
                      </div>

                  </div>

                  <div>
                      <div>Fabrication (Pick up to 2 appropriate fabrication methods mentioned in the resource. If there are none, please leave this section blank)</div>

                      <ButtonDropdown style={{width:"100%", height: "5%"}} isOpen={this.state.dropdownOpenFab} toggle={this.toggleFab}>
                              <DropdownToggle style={{backgroundColor: "white", color: "black"}} caret>
                                <div style={{ transform: "translateY(-25%)"}}>Fabrication</div>
                              </DropdownToggle>
                              <DropdownMenu className="dropdownStyle" style={{width:"100%", overflowY:"scroll", height: window.innerHeight * 0.4}}>

                              </DropdownMenu>
                      </ButtonDropdown>

                  </div>



          </div>


          <div className="contributeBody">
                  LOLOL
          </div>

      </div>
    )

  }
}

const mapStateToProps = state => {
    return {

    }
};

export default connect(mapStateToProps)(ContributePage);
