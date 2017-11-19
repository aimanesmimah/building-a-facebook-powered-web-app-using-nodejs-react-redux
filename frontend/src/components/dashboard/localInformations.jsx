import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import Cookies from 'universal-cookie';
import anonym from '../../common/images/anonym.png';
import {StyledInfos,InfosItems,InfoItem,StyledInfosInput,StyledInfosButton,ErrorMessage,SuccessMessage}
    from '../../styledComponents/styledComponents';
import {updateUser,updateSignup,updateSignupFieldError} from '../../store/actions';


const LocalInfos = (props,{store}) => {

  const {signup} = store.getState();
  const onSubmit = (e) => {
    e.preventDefault();

    const cookies = new Cookies();

    if(this.email.value !== "" && this.password.value !== "" &&
       this.password.value === this.confirm.value ){
         fetch('/index/updateUser'  ,{method: "post",
             headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization' : cookies.get('userToken') },
              body: JSON.stringify({email: this.email.value, password: this.password.value})
                 })
            .then(res =>{  console.log(res); return  res.json(); })
            .then(data => {

                    store.dispatch(updateUser(data.userId,data.email,data.photo));
                    store.dispatch(updateSignup(true,false,"updated successfully"));
            })
            .catch(err => {
                store.dispatch(updateSignup(false,true,"server doesn't respond"));
                //alert('failure');
            });
    }
    else {
        if(this.email.value === ""){
          //this.setState({errorMessage : "email field is empty"});
          store.dispatch(updateSignupFieldError("email field is empty"));
          return ;
        }

        if(this.password.value === ""){
          //this.setState({errorMessage : "password field is empty"});
          store.dispatch(updateSignupFieldError("password field is empty"));
          return ;
        }

        if(this.password.value !== this.confirm.value){
          //this.setState({errorMessage : "password confirmation doesn't match"});
          store.dispatch(updateSignupFieldError("password confirmation doesn't match"));
        }
    }
  }

  return (
  <StyledInfos className={props.className}>
     <InfosItems>
       <div>
         {
           (signup.fieldErrorMessage)?
              <ErrorMessage>{signup.fieldErrorMessage}</ErrorMessage> :
                 (signup.error)?
                     <ErrorMessage>{signup.message}</ErrorMessage> :
                       (signup.success)? <SuccessMessage>{signup.message}</SuccessMessage> : ""
         }
         <table>
           <tr>
             <td><InfoItem>Account ID : </InfoItem></td>
             <td><InfoItem>{props.userId}</InfoItem></td>
           </tr>
           <tr>
             <td><InfoItem>Email : </InfoItem></td>
             <td>
               <StyledInfosInput type="text" placeholder={props.email} innerRef={x => this.email = x} />
             </td>
           </tr>
           <tr>
             <td><InfoItem>changePassword : </InfoItem></td>
             <td><StyledInfosInput type="password" innerRef={x => this.password = x} /></td>
           </tr>
           <tr>
             <td><InfoItem>confirm new password : </InfoItem></td>
             <td><StyledInfosInput type="password" innerRef={x => this.confirm = x} /></td>
           </tr>
           <tr>
             <td>
               <StyledInfosButton onClick={onSubmit} >
                 update
               </StyledInfosButton>
             </td>
           </tr>
         </table>
       </div>
       <div>
         <InfoItem>
           <Avatar value="86%" src={(props.photo)? "" : anonym } round={true} size="100"
              style={{marginTop : 30}}/>
         </InfoItem>
       </div>
     </InfosItems>
  </StyledInfos>
   )
}

LocalInfos.contextTypes = {
  store : PropTypes.object
}

export default LocalInfos ;
