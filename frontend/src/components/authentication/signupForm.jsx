import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../loaders/dotsLoader';
import ConfirmMessage from './confirmMessage' ;
import AuthenticationTemplate from './authenticationTemplate';
import {StyledInput,StyledAuthSection,StyledButton,ErrorMessage} from '../../styledComponents/styledComponents';
import {updateSignup,updateSignupFieldError} from '../../store/actions';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
       loading : false
    }
    this.submitData = this.submitData.bind(this);
  }

  componentWillMount(){
    const {store} = this.context ;
    //store.dispatch(updateSignup(true,false,"first test update of the store"));
  }

  submitData(e){
    const {store} = this.context ;
    const {loading} = this.state ;
    e.preventDefault();
    //alert(this.email.value + " " + this.password.value + " " + this.confirm.value);
    if(!loading){
    if(this.email.value !== "" && this.password.value !== "" &&
       this.password.value === this.confirm.value ){
         this.setState({loading : true});
         fetch('/users/register'  ,{method: "post",
             headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json' },
              body: JSON.stringify({email: this.email.value, password: this.password.value})
                 })
            .then(res =>{  console.log(res); return  res.json(); })
            .then(data => {

                if(data.success){

                  setTimeout(() => {
                    store.dispatch(
                      updateSignup(true,false,data.message,data.email,data.password)
                    );
                    this.setState({loading : false});
                  },3000);
                }
                else{

                  setTimeout(() => {
                    store.dispatch(updateSignup(false,true,data.message));
                    this.setState({loading : false});
                    setTimeout(()=> {
                      store.dispatch(updateSignup(false,false));
                    },5000);

                  },3000);
                }

            })
            .catch(err => {

                setTimeout(()=> {
                  store.dispatch(updateSignup(false,true,"server doesn't respond"));
                  this.setState({loading : false});
                  setTimeout(()=> {
                    store.dispatch(updateSignup(false,false));
                  },5000);
                },3000);

            });
    }
    else {
        if(this.email.value === ""){
          //this.setState({errorMessage : "email field is empty"});
          store.dispatch(updateSignupFieldError("email field is empty"));

        }

        else if(this.password.value === ""){
          //this.setState({errorMessage : "password field is empty"});
          store.dispatch(updateSignupFieldError("password field is empty"));

        }

        else if(this.password.value !== this.confirm.value){
          //this.setState({errorMessage : "password confirmation doesn't match"});
          store.dispatch(updateSignupFieldError("password confirmation doesn't match"));
        }

        setTimeout(()=>{
          store.dispatch(updateSignupFieldError(null));
        },5000);
    }
  }



  }

  componentWillUnMount(){

  }


  render() {
    const {loading} = this.state ;
    const {signup} = this.context.store.getState();
    return (
      (signup.success)?
        <ConfirmMessage message={signup.message} email={signup.email}
              password={signup.password} /> :
      <AuthenticationTemplate>
        {
          (signup.fieldErrorMessage)? <ErrorMessage>{signup.fieldErrorMessage}</ErrorMessage> :
          (signup.error)? <ErrorMessage>{signup.message}</ErrorMessage> : ""
        }
        <form onSubmit={this.submitData}>
          <StyledAuthSection>
            <StyledInput type="text" innerRef={email => this.email = email}
              placeholder="enter your email" />
          </StyledAuthSection>
          <StyledAuthSection>
            <StyledInput type="password" innerRef={password => this.password = password}
              placeholder="enter your password" />
          </StyledAuthSection>
          <StyledAuthSection>
            <StyledInput type="password" innerRef={confirm => this.confirm = confirm}
              placeholder="confirm your password" />
          </StyledAuthSection>
          <StyledButton type="submit" loading={loading}>
              {(!loading)? "Sign Up" : <Loader color="white" length={3}/> }
          </StyledButton>

        </form>
      </AuthenticationTemplate>
    );
  }
}

SignUpForm.propTypes = {

};

SignUpForm.contextTypes = {
  store : PropTypes.object
}
