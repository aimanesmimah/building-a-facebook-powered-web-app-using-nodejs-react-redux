import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyledAuthTemplate,AuthHeader,AuthBody,StyledAppTitle,StyledAppLogo}
     from '../../styledComponents/styledComponents';
import appLogo from '../../common/images/facebookapp-logo.png';

const AuthenticationTemplate = ({children})=> (
   <StyledAuthTemplate>
     <AuthHeader>
       <StyledAppLogo src={appLogo} />
       <StyledAppTitle>an easy way to manage and share your facebook albums & photos</StyledAppTitle>
     </AuthHeader>
     <AuthBody>
         {children}
     </AuthBody>
   </StyledAuthTemplate>
)

export default AuthenticationTemplate;
