import React from 'react';
import {StyledAppMenu,AppMenuItem,AppMenuLink} from '../styledComponents/styledComponents';


class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }


  }


  render(){
    const {title} = this.props;
    return (
    <StyledAppMenu>
      <AppMenuItem active={title === "dashboard"} >
        <AppMenuLink  to="/dashboard/index" >
             Dashboard
        </AppMenuLink>
      </AppMenuItem>
      <AppMenuItem active={title === "account"}>
        <AppMenuLink  to="/dashboard/account" >
           Account
        </AppMenuLink>
      </AppMenuItem>
    </StyledAppMenu>
  )
  }
}

export default AppMenu ;
