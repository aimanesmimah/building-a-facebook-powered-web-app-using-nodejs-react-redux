import React, { Component } from 'react';
import {StyledLoaderItem,StyledLoaderImage} from '../../styledComponents/styledComponents';



class MySVG extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }


  render() {
    const {color} = this.props;
    return(
      <StyledLoaderItem>
        <svg width="20" height="28">
          <circle cx="10" cy="10" r="7" fill={color}  />
        </svg>
      </StyledLoaderItem>
    )
  }
}

export default MySVG;
