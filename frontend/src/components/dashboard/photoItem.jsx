import React from 'react';
import PropTypes from 'prop-types';
import {StyledPhotoItem,Styledfbimage,StyledPhotoCheckbox} from '../../styledComponents/styledComponents';
import $ from 'jquery';
import {updateCheckedPhoto} from '../../store/actions';

const PhotoItem = (props,{store})=> {
  //alert(JSON.stringify(store.getState()));
  const handleClick = (photoId) => {
    //alert($('#' + photoId).is(':checked'));
    store.dispatch(updateCheckedPhoto(photoId,$('#' + photoId).is(':checked')));

  }


  return ( <StyledPhotoItem>
            <StyledPhotoCheckbox id={props.photoId} type="checkbox"
              onClick={()=>handleClick(props.photoId)} picChecked={props.checked}  />
            <Styledfbimage onClick={()=>props.onClick(props.photoId.split('_')[1])}
                src={props.url} alt="" />
           </StyledPhotoItem> )
}

PhotoItem.contextTypes = {
  store : PropTypes.object
}

export default PhotoItem ;
