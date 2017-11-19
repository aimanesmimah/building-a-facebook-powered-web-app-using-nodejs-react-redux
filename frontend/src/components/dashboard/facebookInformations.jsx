import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import anonym from '../../common/images/anonym.png';
import {StyledInfos,InfosItems,InfoItem,ErrorMessage} from '../../styledComponents/styledComponents';


const FBInfos = ({available,profilePic,accountId,displayName,email,className}) => (
  <StyledInfos className={className}>
    {
      (available)?
    <InfosItems>
      <div style={{marginTop : 15,marginLeft : 40}}>
        <InfoItem>Account ID : {accountId}</InfoItem>
        <InfoItem>Display Name : {displayName}</InfoItem>
        <InfoItem>Email : {email}</InfoItem>
      </div>
      <div>
        <InfoItem>
          <Avatar value="86%" src={(profilePic)? profilePic : anonym }
            round={true} size="100" style={{marginRight :40}} />
        </InfoItem>
      </div>
    </InfosItems> :
    <ErrorMessage>No data available for now</ErrorMessage>
    }
  </StyledInfos>
)

export default FBInfos ;
