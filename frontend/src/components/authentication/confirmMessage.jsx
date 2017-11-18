import React from 'react';
import AuthenticationTemplate from './authenticationTemplate';
import Envelope from 'react-icons/lib/fa/envelope-o';
import Eye from 'react-icons/lib/fa/eye-slash';
import {StyledAuthLink,SuccessMessage,StyledConfirmMessage,StyledMessageList,
  StyledMessageListItem,StyledMessageListIcon} from '../../styledComponents/styledComponents';


const ConfirmMessage = ({message,email=null,password=null}) => (
  <AuthenticationTemplate>
   <StyledConfirmMessage>

           <SuccessMessage>{message}</SuccessMessage>
             <StyledMessageList>
                 <StyledMessageListItem>
                   <StyledMessageListIcon>
                     <Envelope style={{width : 20 , height : 20}} />
                   </StyledMessageListIcon>
                   {email}
                 </StyledMessageListItem>
                 <StyledMessageListItem>
                   <StyledMessageListIcon>
                     <Eye style={{width : 20 , height : 20}} />
                   </StyledMessageListIcon>
                   {password}
                 </StyledMessageListItem>
             </StyledMessageList>

           <br/>
           <StyledAuthLink href="#/signIn">Sign in with these credentials.</StyledAuthLink>
   </StyledConfirmMessage>
   </AuthenticationTemplate>
)

export default ConfirmMessage ;
