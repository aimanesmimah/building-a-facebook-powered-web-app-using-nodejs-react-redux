import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import AppTemplate from '../appTemplate';
import {Redirect} from 'react-router-dom';
import {StyledAppTitle} from '../../styledComponents/styledComponents';
import Cookies from 'universal-cookie';
import LocalInfos from './localInformations';
import FBInfos from  './facebookInformations';
import ToggleSection from './toggleSection';
import {updateUser,updateUserConnection} from '../../store/actions';

export default class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : false,
      showToggleA : true,
      showToggleB : true
    }

    this.toggleSection = this.toggleSection.bind(this);
  }

  componentWillMount() {
      //this.setState({loading: true});
      var cookies = new Cookies();
      const {store} = this.context;


      if(cookies.get('userToken') && !store.getState().user.connected){
        store.dispatch(updateUserConnection(true));
      }

      fetch('/index/account',{method: "get",
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization' : cookies.get('userToken') }
         } )
         .then(res =>{  console.log(res); return  res.json(); })
         .then(data => {
              //alert(JSON.stringify(data));
              store.dispatch(updateUser(data.userId,data.email,data.photo));
              this.setState({loading: false});
         })
         .catch(err => {
              //alert('failure');
              this.setState({loading: false});
         });



  }

  toggleSection(e,section){
    e.preventDefault();
    if(section === "account"){

      $( ".localinfos" ).slideToggle( "slow", () => {
            this.setState({showToggleA : !this.state.showToggleA});
      });
    }
    if(section === "facebook"){
      $( ".fbinfos" ).slideToggle( "slow", () => {
           this.setState({showToggleB : !this.state.showToggleB});
      });
    }
  }

  componentDidMount() {

  }

  render() {
    const {loading,showToggleA,showToggleB} = this.state ;
    const {user,userFB} = this.context.store.getState();

    return (
      (user.connected)?
      <AppTemplate title="account">
              <ToggleSection  title="account" onToggle={this.toggleSection} show={showToggleA} />
              <LocalInfos className="localinfos" userId={user.id} email={user.email}
                 photo={user.photo}  />
              <ToggleSection title="facebook" onToggle={this.toggleSection} show={showToggleB} />
              <FBInfos className="fbinfos" available={userFB.available}
                profilePic={userFB.profilePic} accountId={userFB.accountId}
                displayName={userFB.displayName} email={userFB.email} />
      </AppTemplate>
        :
      <Redirect to='/signIn' />
    );
  }

}

UserAccount.contextTypes = {
  store : PropTypes.object
}
