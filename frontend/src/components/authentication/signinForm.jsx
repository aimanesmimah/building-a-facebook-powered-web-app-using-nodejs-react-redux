import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loader from '../loaders/dotsLoader';
import AuthenticationTemplate from './authenticationTemplate';
import {StyledInput,StyledButton,StyledAuthSection,StyledAuthLink,ErrorMessage}
    from '../../styledComponents/styledComponents';
import {updateSignin,updateUser,updateUserConnection} from '../../store/actions';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false
    }

    this.submitLogin = this.submitLogin.bind(this);
  }

  submitLogin(e){
    const {store} = this.context;
    e.preventDefault();

    if(this.email.value !== "" && this.password.value !== "" ){
       this.setState({loading : true});
       fetch('/users/signin'  ,{method: "post",
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' },
            body: JSON.stringify({email: this.email.value, password: this.password.value})
               })
          .then(res =>{  console.log(res); return  res.json(); })
          .then(data => {

              if(data.success){

                setTimeout(() => {
                  const cookies = new Cookies();
                  cookies.set('userToken',data.token,{path: '/'});
                  this.setState({loading : false});
                  store.dispatch(updateSignin(false,data.message));
                  store.dispatch(updateUser(data.userId,data.email));
                  store.dispatch(updateUserConnection(true));
                },2000);
              }
              else{

                setTimeout(() => {
                  store.dispatch(updateSignin(true,data.message));
                  this.setState({loading : false});
                  setTimeout(()=> {
                    store.dispatch(updateSignin(false));
                  },5000);

                },2000);
              }

          })
          .catch(err => {

              setTimeout(()=> {
                store.dispatch(updateSignin(true,"server doesn't respond. Try later"));
                setTimeout(()=> {
                  store.dispatch(updateSignin(false));
                },5000);
                this.setState({loading : false});

              },2000);

          });
    }
    else{

    }
  }

  componentWillMount() {

  }

  render() {
    const {loading} =this.state ;
    const {user,signin} = this.context.store.getState();
    return (
      (user.connected)?
      <Redirect to="/dashboard/index" /> :
      <AuthenticationTemplate>
        <br/>
        <StyledAuthLink href="#/signUp">You don't have an account?</StyledAuthLink>
        {
          (signin.error)? <ErrorMessage>{signin.message}</ErrorMessage> : ""
        }
        <form onSubmit={this.submitLogin}>
          <StyledAuthSection>
            <StyledInput type="text" innerRef={email => this.email = email}
              placeholder="enter your email" />
          </StyledAuthSection>
          <StyledAuthSection>
            <StyledInput type="password" innerRef={password => this.password = password}
              placeholder="enter your password"/>
          </StyledAuthSection>
          <StyledButton type="submit" loading={loading}>
            {(!loading)? "Sign In" : <Loader color="white" length={3}/> }
          </StyledButton>
        </form>
      </AuthenticationTemplate>
    );
  }
}

SignInForm.propTypes = {

};

SignInForm.contextTypes = {
  store : PropTypes.object
}
