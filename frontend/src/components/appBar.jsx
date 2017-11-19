import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import {Redirect} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Cookies from 'universal-cookie';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {StyledAppBar,BarLeftBox,BarRightBox,StyledBarIcon, StyledLink} from '../styledComponents/styledComponents';
import appLogo from '../common/images/facebookapp-logo.png';
import AppMenu from './appMenu';
import {updateUser,updateUserConnection} from '../store/actions';


class AppBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      logout : false,
      accountPage : false
    }

    this.onClick = this.onClick.bind(this);
  }

  onClick(e,item){
     //alert(item);
     if(item === 'logout'){
       const {store} = this.context;
       const cookies = new Cookies();
       cookies.remove('userToken');
       //this.setState({logout : true});
       store.dispatch(updateUserConnection(false));
     }

     if(item === 'account'){
       alert('account');
     }
  }

  render(){
    const {logout,accountPage} = this.state;
    const {title} = this.props;
    const {user} = this.context.store.getState();
  return(
    <StyledAppBar>
        <BarLeftBox>
          <div>
            <StyledBarIcon src={appLogo} alt="" />
          </div>
          <div>
            <AppMenu  title={title} />
          </div>
        </BarLeftBox>
        <BarRightBox>
          <div>
            <Avatar value="86%" name={user.email} round={true} size="50"
              style={{width : 50 , height : 50}} />
          </div>
          <div>
            <MuiThemeProvider>
              <IconMenu iconButtonElement={
                <IconButton touch={true}>
                   <NavigationExpandMoreIcon  />
                </IconButton>
              } >
                <MenuItem>
                  <StyledLink href="#/dashboard/account" >Account</StyledLink>
                </MenuItem>
                <MenuItem primaryText="Logout" onClick={(e)=>this.onClick(e,'logout')}/>
              </IconMenu>
            </MuiThemeProvider>
          </div>
        </BarRightBox>
  </StyledAppBar>
    )
  }
}

AppBar.contextTypes = {
  store : PropTypes.object
}

export default AppBar;
