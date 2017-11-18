import React from 'react';
import ReactLoader from 'react-loader';
import {StyledLoader} from '../../styledComponents/styledComponents';

var options = {
    lines: 13,
    length: 20,
    width: 15,
    radius: 30,
    scale: 0.23,
    corners: 1,
    color: '#fff',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    shadow: false,
    hwaccel: false,
    position: 'relative'
};


const Loader = ({loadingMessage}) => (
  <StyledLoader>
    <ReactLoader loaded={false} options={options} className="spinner" />
    <br/>
    <span >{loadingMessage}</span>
  </StyledLoader>

)

export default Loader;
