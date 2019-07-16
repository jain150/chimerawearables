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
    }

    render() {

      const closeBtn = <Button onClick={this.toggle} color="secondary">{"Close (X)"}</Button>

      /*
        Make sign up warning and login warning in store and if success, call searchDisplay or toggleSearchDisplay.
        Whateva
      */



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

         <Button style={{backgroundColor: "black", color: "white"}} color="black" onClick={this.toggle}>Login/Sign Up</Button>{' '}

         <Modal size="lg" style={{maxWidth: '60vw', maxHeight: '60vh', width: '60vw', height: '60vh'}} isOpen={this.state.modal} toggle={this.toggle}>
           <ModalHeader close={closeBtn} style={{backgroundColor: "black", color: "white"}} toggle={this.toggle}>Login/Signup</ModalHeader>

           <ModalBody style={{backgroundColor: "black", color: "white"}}>

           <div style={{display: "flex"}}>
            <div style={{width: "45%"}}>
            <b>Login</b>

               <Form>
                    <FormGroup>
                       <Label for="exampleEmail">Email</Label>
                       <Input type="email" name="email" id="exampleEmail"  />
                     </FormGroup>
                     <FormGroup>
                       <Label for="examplePassword">Password</Label>
                       <Input type="password" name="password" id="examplePassword"  />
                     </FormGroup>
                </Form>
            </div>

            <div style={{width: "45%", marginLeft: "7%"}}>
            <b>Sign Up</b>

               <Form>

                       <Label style={{marginTop: "10px"}} for="exampleEmail">Email</Label>
                       <Input type="email" onChange={this.onSignUpEmailChange} placeholder="Enter your email" value={this.state.signUpEmail}/>

                       <Label style={{marginTop: "10px"}} for="examplePassword">Password</Label>
                       <Input type="password" onChange={this.onSignUpPasswordChange} placeholder="Enter your password" value={this.state.signUpPassword} />

                      <Button onClick={this.onSignUpSubmit} style={{marginTop: "10px"}} color="secondary">Sign Up!!!</Button>
                </Form>
            </div>

            </div>
           </ModalBody>

         </Modal>

         <Button style={{backgroundColor: "black", color: "white"}} color="black" onClick={this.props.toggle}>Guest Mode</Button>
          </div>
      </div>
    );
  }
}


export default HomePage;
