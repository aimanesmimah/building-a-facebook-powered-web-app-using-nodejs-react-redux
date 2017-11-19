import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Loader from '../loaders/reactLoader';
import facebookIcon from '../../common/images/facebook-icon.png';
import facebookIconHover from '../../common/images/facebook-icon-preview.png';
import {StyledIcon,StyledFacebookButton} from '../../styledComponents/styledComponents';



class FacebookButton extends Component{
  constructor(props){
    super(props);
    this.state = {
       hover : false
    }
  }

  render(){
    const {onClick} = this.props;
    const {loading,loadingMessage,loaded,upload,uploaded} =
       this.context.store.getState().userDashboard;

    return (
      <StyledFacebookButton loading={loading} loaded={loaded}
        uploaded={uploaded} onClick={onClick}
        disabled={loaded || loading}
        onMouseOver={()=> this.setState({hover : true})}
        onMouseLeave={()=> this.setState({hover : false})}>
        {(loading)? <Loader loadingMessage={loadingMessage} /> :
          (uploaded)?
             <span>your photos are uploaded to firebase successfully</span>:
          (upload)?
              <span>select and upload your pictures to firebase</span> :
           (loaded)?
              <span>your photos are loaded successfully</span> :
              <span>
               { (this.state.hover)?
                    <StyledIcon src={facebookIconHover} alt="icon" /> :
                    <StyledIcon src={facebookIcon} alt="icon" />
               }
               <br/>
               connect your facebook and upload
              </span>
         }
      </StyledFacebookButton>
    )
  }
}

FacebookButton.contextTypes = {
  store : PropTypes.object
}

export default FacebookButton;
