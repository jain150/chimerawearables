import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.css'
import * as actionTypes from '../store/actions';
import {Alert} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class HomePage extends Component {

  constructor(props) {

      super(props);

        this.state = {
          zone: 'none',
          signUpEmail: '',
          signUpPassword: '',
          modal: false
        };

      this.onSignUpEmailChange = this.onSignUpEmailChange.bind(this);
      this.onSignUpPasswordChange = this.onSignUpPasswordChange.bind(this);
  }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    onSignUpEmailChange = (event) => {


      this.setState({
        signUpEmail: event.target.value,
      });
    }

    onSignUpPasswordChange = (event) => {

      this.setState({
        signUpPassword: event.target.value,
      });
    }

    onSignUpSubmit = () => {

      console.log(this.state.signUpEmail);
      console.log(this.state.signUpPassword);

      /*
        Let's send JSON request over here, if it success, we'll call success, if fails we'll call failure
      */

      let success = true;
      let bookMarks = [];

      if(success) {
        this.props.authSuccess(bookMarks);
        this.props.toggle();
      }

    }

    render() {

      const closeBtn = <Button onClick={this.toggle} color="secondary">{"Close (X)"}</Button>

      /*
        Make sign up warning and login warning in store and if success, call searchDisplay or toggleSearchDisplay.
        Whateva
      */



      return (
      <div style={{backgroundImage: "url(http://127.0.0.1:8087/ImageDatabase/Icons/Home.png)", height: "100vh", width:"100vw", backgroundSize: "cover", backgroundColor: "black"}}>

         <div className="containerHome">

         <div style={{color: "white", marginLeft: "-10vw"}}>Welcome to Chimera, an interactive search engine for Wearables</div>

         <Button outline size="lg" style={{color: "white", marginTop: "5vh", marginLeft: "2vw", borderStyle: "thin", borderColor: "white", borderRadius: "2px"}} color="black" onClick={this.toggle}>Enter</Button>{' '}

         <Modal size="lg" style={{backgroundColor: "black", maxWidth: '80vw',  maxHeight: '80vh', width: '82vw', height: '82vh', borderStyle: "solid", borderColor: "white", borderRadius: "6px"}} isOpen={this.state.modal} toggle={this.toggle}>

           <ModalBody style={{backgroundColor: "black", color: "white", maxWidth: '80vw',  maxHeight: '80vh', width: '79.7vw', height: '79vh'}}>

           <div style={{display: "flex"}}>
            <div style={{width: "30%"}}>


               <Form>
                    <FormGroup>
                       <Label for="exampleEmail">Email</Label>
                       <Input style={{ borderRadius: "0px"}} type="email" name="email" id="exampleEmail" />
                     </FormGroup>
                     <FormGroup>
                       <Label for="examplePassword">Password</Label>
                       <Input style={{ borderRadius: "0px"}} type="password" name="password" id="examplePassword" />
                     </FormGroup>

                     <Button onClick={this.onSignUpSubmit} style={{marginTop: "10px", marginLeft: "8vw", transform: "translateY(100px)"}} color="secondary">Login</Button>
                </Form>
            </div>

            <div style={{width: "30%", marginLeft: "7%"}}>


               <Form>

                       <Label style={{marginTop: "10px"}} for="exampleEmail">Username</Label>
                       <Input style={{ borderRadius: "0px"}} type="text"/>

                       <Label style={{marginTop: "10px"}} for="exampleEmail">Email</Label>
                       <Input style={{ borderRadius: "0px"}} type="email" onChange={this.onSignUpEmailChange} value={this.state.signUpEmail}/>

                       <Label style={{marginTop: "10px"}} for="examplePassword">Password</Label>
                       <Input style={{ borderRadius: "0px"}} type="password" onChange={this.onSignUpPasswordChange} value={this.state.signUpPassword} />

                      <Button onClick={this.onSignUpSubmit} style={{marginTop: "10px", marginLeft: "8vw", transform: "translateY(37px)"}} color="secondary">Sign Up</Button>
                </Form>
            </div>

            <div style={{width: "30%", marginLeft: "7%"}}>


               <Form>
                       <Label style={{marginTop: "10px"}} for="exampleEmail">Username</Label>
                       <Input style={{ borderRadius: "0px"}} type="email"/>

                      <Button onClick={this.props.toggle} style={{marginTop: "10vh", marginLeft: "8vw", transform: "translateY(131px)"}} color="secondary">Guest Mode</Button>
                </Form>
            </div>

            </div>
           </ModalBody>

         </Modal>
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        searchData: state.searchData,
        function: state.functions,
        material: state.material,
        fabrication: state.fabrication,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authSuccess: (value) => dispatch({type: actionTypes.AUTH_SUCCESS, val: value}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
