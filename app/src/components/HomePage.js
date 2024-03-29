import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import { connect } from 'react-redux';
import './HomePage.css'
import * as actionTypes from '../store/actions';
import {Alert} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import GoogleLogin from 'react-google-login';
import tutorial from '../ImageDatabase/tutorial.mp4';

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

      this.onGoogleLoginSubmit = this.onGoogleLoginSubmit.bind(this);
      this.onGoogleSignUpSubmit = this.onGoogleSignUpSubmit.bind(this);
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

    onGoogleLoginSubmit = (username, password, email) => {

      let success = true;
      let bookMarks = [];

      let authSuccess = this.props.authSuccess;
      let toggleDisp = this.props.toggle;

      let onLoginWarningChange = this.onLoginWarningChange;

      let onGoogleSignUpSubmit = this.onGoogleSignUpSubmit;

      let jsonToSend = JSON.stringify({
           username: username,
           password: password
       })

       let pwd = password;

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

                    authSuccess(objReceived.username, pwd, objReceived.bookmarks);
                    toggleDisp();
                 }
                 else {

                     onGoogleSignUpSubmit(username, email, password);


                 }
             })
           }

           else {
             onGoogleSignUpSubmit(username, email, password);
           }
       })

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

       let pwd = this.state.loginPassword;

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

                    authSuccess(objReceived.username, pwd, objReceived.bookmarks);
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


  responseGoogle = (response) => {
   console.log(response);

   this.onGoogleLoginSubmit(response.profileObj.name,response.profileObj.name,response.profileObj.email);

   /*
    If successful, use the username to login with same password, if login fails, try signup with that username password
   */
  }

  responseGoogleError = (response) => {
   console.log("error");
  }

  onGoogleSignUpSubmit = (username, email, password) => {

    let success = true;
    let bookMarks = [];

    let authSuccess = this.props.authSuccess;
    let toggleDisp = this.props.toggle;

    let onSignUpWarningChange = this.onSignUpWarningChange;

    let pwd = password;

    let jsonToSend = JSON.stringify({
         username: username,
         email: email,
         password: password
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

                  console.log(objReceived);
                  authSuccess(objReceived.username, pwd, objReceived.bookmarks);
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

    onSignUpSubmit = () => {

      let success = true;
      let bookMarks = [];

      let authSuccess = this.props.authSuccess;
      let toggleDisp = this.props.toggle;

      let onSignUpWarningChange = this.onSignUpWarningChange;

      let pwd = this.state.signUpPassword;

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

                    console.log(objReceived);
                    authSuccess(objReceived.username, pwd, objReceived.bookmarks);
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

         <div style={{color: "white", textAlign: "center", margin: "5% 25%"}}>
         Welcome to Chimera, an interactive database for wearables development & information awareness.
         It includes Research - Tutorials - Patents - Concepts and Aesthetic approaches used by the wearables
         community to inspire & boost the wearables development from different field perspectives.
         </div>

         <div style={{display: "flex", marginTop: "3%"}}>
             {/*<div style={{marginLeft: "38%"}}>
               <GoogleLogin
                clientId="1030014197436-1oftnoda9j1qk7qgv0cpjbc625q1qr2k.apps.googleusercontent.com"
                render={renderProps => (
                    <Button color="secondary" onClick={renderProps.onClick}>Google Login</Button>
                  )}
                buttonText="Google Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogleError}
                cookiePolicy={'single_host_origin'}

              />
                </div>*/}

             <Button onClick={this.props.toggle} style={{ margin: "0 auto" }} color="secondary">Enter</Button>
             
         </div>
         <div style={{display: "flex", marginTop: "1%"}}>
             

             
          <Button style={{ margin: "0 auto"}} color = "secondary" onClick={() => this.simpleDialog.show()}>Watch Tutorial</Button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title="Welcome to Chimera Wearables!">
          
        <video src={tutorial} width="100%" height="100%" controls = "controls" />

        </SkyLight>
         </div>
         <Modal size="lg" style={{backgroundColor: "black", maxWidth: '90vw',  maxHeight: '90vh', width: '90vw', height: '90vh'}} isOpen={this.state.modal} toggle={this.toggle}>

           <ModalBody style={{backgroundColor: "black", color: "white"}}>
           <div style={{display: "flex"}}>
            <div style={{width: "30%", marginTop: "1.25%"}}>
               <Form>
                      {(this.state.loginWarning !== '') ? (<div style={{color: "red"}}>{this.state.loginWarning}</div>) : (<div></div>)}
                       <div>Username</div>
                       <Input style={{ borderRadius: "0px"}} type="text" onChange={this.onLoginUsernameChange} value={this.state.loginUsername}/>

                       <div style={{marginTop: "4.83%"}}>Password</div>
                       <Input style={{ borderRadius: "0px"}} type="password" onChange={this.onLoginPasswordChange} value={this.state.loginPassword} />

                     <Button onClick={this.onLoginSubmit} style={{marginTop: "10%", marginLeft: "38%"}} color="secondary">Login</Button>

                </Form>
                <div style={{marginTop: "10%", marginLeft: "25%"}}>
                  <GoogleLogin
                   clientId="1030014197436-1oftnoda9j1qk7qgv0cpjbc625q1qr2k.apps.googleusercontent.com"
                   buttonText="Google Login"
                   onSuccess={this.responseGoogle}
                   onFailure={this.responseGoogleError}
                   cookiePolicy={'single_host_origin'}
                 />
               </div>
            </div>
            <div style={{width: "30%", marginLeft: "7%"}}>
               <Form>
                        {(this.state.signUpWarning !== '') ? (<div style={{color: "red"}}>{this.state.signUpWarning}</div>) : (<div></div>)}
                       <div style={{marginTop: "10px"}}>Username</div>
                       <Input style={{ borderRadius: "0px"}} type="text" onChange={this.onSignUpUsernameChange} value={this.state.signUpUsername}/>

                       <div style={{marginTop: "10px"}}>Email</div>
                       <Input style={{ borderRadius: "0px"}} type="email" onChange={this.onSignUpEmailChange} value={this.state.signUpEmail}/>

                       <div style={{marginTop: "10px"}}>Password</div>
                       <Input style={{ borderRadius: "0px"}} type="password" onChange={this.onSignUpPasswordChange} value={this.state.signUpPassword} />

                      <Button onClick={this.onSignUpSubmit} style={{marginTop: "10%", marginLeft: "38%"}} color="secondary">Sign Up</Button>
                </Form>
            </div>

            <div style={{width: "30%", marginLeft: "7%"}}>
               <Form>
                       <div style={{marginTop: "10px"}}>Username</div>
                       <Input style={{ borderRadius: "0px"}} type="email"/>

                      <Button onClick={this.props.toggle} style={{marginTop: "10%", marginLeft: "35%"}} color="secondary">Guest Mode</Button>
                </Form>
            </div>

            </div>
            <img src={"ImageDatabase/Icons/Home.png"}
             alt="" style={{width: '25%', transform: "translate(155%, 100%)", objectFit: "cover"}}/>
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
