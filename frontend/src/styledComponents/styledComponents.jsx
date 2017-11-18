import styled,{css} from 'styled-components';

export const StyledAuthTemplate = styled.div`
    position : relative;
    background: white;
    height : 100vh;
    display: flex;
    flex-direction: column;
`

export const AuthHeader = styled.div`
    margin : 50px 0 0 0
`

export const AuthBody = styled.div`
    margin : 20px 0 0 0;
`

export const StyledAppLogo  = styled.img`
   width : 300px ;
   height : 60px;
`

export const StyledAppTitle = styled.p`
  font: 300 1.1em/150% Impact;
  color : #122ec2;
`


export const StyledInput = styled.input`
  border : none ;
  background: transparent ;
  color : black;
  width : 100% ;
  text-align: center;
  font-size : 15px ;
  font-weight : 500;
  /*border : 1px solid black;*/
  &:focus {
    outline: none;
    font-size : 20px ;
  }
`
export const ErrorMessage = styled.p`
  font-size: 13px ;
  font-weight: 500;
  color : red ;
  margin : 0 0 10px 0 ;

`
export const SuccessMessage = styled.p`
  font-size: 13px ;
  font-weight: 500;
  color : #61c276 ;
  margin : 0 0 10px 0 ;
`
export const StyledAuthSection = styled.section`
  width : 300px;
  margin-top: 30px;
  margin: 20px auto 30px auto;
  padding: auto;
  /*border : 1px solid black;*/
  &:after{
    content : '';
    display: block;
    height : 3px ;
    width : 0%;
    background :#122ec2 ;
    transition: width 0.5s ease;
  }

  &:hover:after {
    transition: width 0.5s ease;
    width : 100%;
  }
`

export const StyledButton = styled.button`
  transition: color .5s ease-in-out;
  transition: background-color 1s ease-in-out;
  transition : width 0.5s ease-in-out;
  width : 100px ;
  height : 50px ;
  background-color: transparent;
  color :#122ec2 ;
  font-weight: 600;
  border-style : solid;
  border-width: 1px;
  border-color :#122ec2;
  border-radius: 5px;
  cursor : pointer;
  &:hover{
     transition: color .5s ease-in-out;
     transition : width 0.5s ease-in-out;
     width : 120px;
     font-weight: 900;
     color : white;
     border : none ;
     background-color : #122ec2;
  }

  &:focus {
    outline: none;
  }

  ${({loading}) => loading && css`
      width : 120px;
      font-weight: 900;
      color : white;
      border : none ;
      background-color : #122ec2;
  `}


`

export const StyledConfirmMessage = styled.div`
  width : 400px;
  margin : auto ;
  padding : auto ;
  font-size : 15px ;
  text-align: center ;
  border : 1px solid black;
`



export const StyledMessageList = styled.ul`
  list-style: none;
  margin : 0 ;
  padding : 0 ;
  border : 1px solid black;
`

export const StyledMessageListItem = styled.li`
  display: block;
`


export const StyledMessageListIcon = styled.span`
  margin : 0 20px 0 0 ;
  padding : 0 ;
`


export const StyledIcon = styled.img`
  width : 30px ;
  height : 30px
`

export const StyledAuthLink = styled.a`
  text-decoration: none;
  color : #2333c6;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color : #ddd;
  }
  &:focus {
    text-decoration: none
  }
`

export const StyledLink = styled.a`
  text-decoration: none;
  color : #444;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color : #ddd;
  }
  &:focus {
    text-decoration: none
  }
`

export const LoaderItemsList = styled.ul`
  list-style: none;

  margin: 0 ;
  padding : 0

`

export const LoaderItem = styled.li`
    display: inline-block;
    margin : 0 ;
    padding : 0;
`

export const StyledLoaderItem = styled.div`

`
