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
          signUpUsername: '',
          signUpPassword: '',
          signUpWarning: '',
          loginUsername: '',
          loginPassword: '',
          loginWarning: '',
          modal: false
        };

      this.onSignUpEmailChange = this.onSignUpEmailChange.bind(this);
      this.onSignUpUsernameChange = this.onSignUpUsernameChange.bind(this);
      this.onSignUpPasswordChange = this.onSignUpPasswordChange.bind(this);
      this.onSignUpWarningChange = this.onSignUpWarningChange.bind(this);

      this.onLoginUsernameChange = this.onLoginUsernameChange.bind(this);
      this.onLoginPasswordChange = this.onLoginPasswordChange.bind(this);
      this.onLoginWarningChange = this.onLoginWarningChange.bind(this);

      this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
      this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

    toggle = () => {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

    onSignUpWarningChange = (event) => {

      this.setState({
        signUpWarning: 'Invalid credentials',
      });
    }

    onLoginWarningChange = (event) => {

      this.setState({
        loginWarning: 'Invalid credentials',
      });
    }

    onSignUpUsernameChange = (event) => {

      this.setState({
        signUpUsername: event.target.value,
      });
    }

    onLoginUsernameChange = (event) => {

      this.setState({
        loginUsername: event.target.value,
      });
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

    onLoginPasswordChange = (event) => {

      this.setState({
        loginPassword: event.target.value,
      });
    }

    onLoginSubmit = () => {

      let success = true;
      let bookMarks = [];

      let authSuccess = this.props.authSuccess;
      let toggleDisp = this.props.toggle;

      let onLoginWarningChange = this.onLoginWarningChange;

      let jsonToSend = JSON.stringify({
           username: this.state.loginUsername,
           password: this.state.loginPassword
       })

       var request = new Request('https://chimerabackend.herokuapp.com/api/login/', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: jsonToSend
           });
       fetch(request).then(function(response){

          if(response.status.toString() === '200') {
             response.text().then(function(text) {

                 var objReceived = JSON.parse(text);
                 if (objReceived.message === 'SUCCESS') {

                    authSuccess(objReceived.username, objReceived.password, objReceived.bookmarks);
                    toggleDisp();
                 }
                 else {

                     onLoginWarningChange();

                 }
             })
           }

           else {
             onLoginWarningChange();
           }
       })

    }

    onSignUpSubmit = () => {

      let success = true;
      let bookMarks = [];

      let authSuccess = this.props.authSuccess;
      let toggleDisp = this.props.toggle;

      let onSignUpWarningChange = this.onSignUpWarningChange;

      let jsonToSend = JSON.stringify({
           username: this.state.signUpUsername,
           email: this.state.signUpEmail,
           password: this.state.signUpPassword
       })

       var request = new Request('https://chimerabackend.herokuapp.com/api/signup/', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
             },
             body: jsonToSend
           });
       fetch(request).then(function(response){

          if(response.status.toString() === '200') {
             response.text().then(function(text) {

                 var objReceived = JSON.parse(text);
                 if (objReceived.message === 'SUCCESS') {

                    authSuccess(objReceived.username, objReceived.password, objReceived.bookmarks);
                    toggleDisp();
                 }
                 else {

                     onSignUpWarningChange();

                 }
             })
           }

           else {
             onSignUpWarningChange();
           }
       })
    }

    render() {

      const closeBtn = <Button onClick={this.toggle} color="secondary">{"Close (X)"}</Button>

      /*
        Make sign up warning and login warning in store and if success, call searchDisplay or toggleSearchDisplay.
        Whateva
      */



      return (

      <div style={{height: "100vh", width:"100vw", backgroundSize: "cover", backgroundColor: "black"}}>

      <div style={{height: '50%', width: '50%'}}>
      <img src={"ImageDatabase/Icons/Home.png"}
       alt="" style={{width: '50vw', transform: "translate(26vw, 18vh)", objectFit: "cover"}}/>
      </div>

         <div className="containerHome">

         <div style={{color: "white", marginLeft: "-10vw"}}>Welcome to Chimera, an interactive search engine for Wearables</div>

         <Button outline size="lg" style={{color: "white", marginTop: "5vh", marginLeft: "2vw", borderStyle: "thin", borderColor: "white", borderRadius: "2px"}} color="black" onClick={this.toggle}>Enter</Button>{' '}

         <Modal size="lg" style={{backgroundColor: "black", maxWidth: '80vw',  maxHeight: '80vh', width: '82vw', height: '82vh', borderStyle: "solid", borderColor: "white", borderRadius: "6px"}} isOpen={this.state.modal} toggle={this.toggle}>

           <ModalBody style={{backgroundColor: "black", color: "white", maxWidth: '80vw',  maxHeight: '80vh', width: '79.7vw', height: '79vh'}}>

           <div style={{display: "flex"}}>
            <div style={{width: "30%"}}>


               <Form>
                    <FormGroup>
                      {(this.state.loginWarning !== '') ? (<div style={{color: "red"}}>{this.state.loginWarning}</div>) : (<div></div>)}
                       <Label for="exampleEmail">Username</Label>
                       <Input style={{ borderRadius: "0px"}} type="text" onChange={this.onLoginUsernameChange} value={this.state.loginUsername}/>
                     </FormGroup>
                     <FormGroup>
                       <Label for="examplePassword">Password</Label>
                       <Input style={{ borderRadius: "0px"}} type="password" onChange={this.onLoginPasswordChange} value={this.state.loginPassword} />
                     </FormGroup>

                     <Button onClick={this.onLoginSubmit} style={{marginTop: "10px", marginLeft: "8vw", transform: "translateY(100px)"}} color="secondary">Login</Button>
                </Form>
            </div>

            <div style={{width: "30%", marginLeft: "7%"}}>


               <Form>
                        {(this.state.signUpWarning !== '') ? (<div style={{color: "red"}}>{this.state.signUpWarning}</div>) : (<div></div>)}
                       <Label style={{marginTop: "10px"}} for="exampleEmail">Username</Label>
                       <Input style={{ borderRadius: "0px"}} type="text" onChange={this.onSignUpUsernameChange} value={this.state.signUpUsername}/>

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
        authSuccess: (valuename, valuepass, value) => dispatch({type: actionTypes.AUTH_SUCCESS, valName: valuename, valPassword: valuepass, val: value}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
