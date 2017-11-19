import React from 'react';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import MinusCircle from 'react-icons/lib/fa/minus-circle';
import {StyledToggleSection,StyledP} from '../../styledComponents/styledComponents';


const ToggleSection = ({title,onToggle,show=true})=> (
  <StyledToggleSection>
    <StyledP>{title}</StyledP>
    <a href="#" onClick={(e)=> onToggle(e,title)} >
      { (show)?
        <PlusCircle style={{color : '#4537e8',width : 30 ,height : 30 }}/> :
        <MinusCircle style={{color : '#4537e8' , width : 30 , height : 30}} />

      }
    </a>
  </StyledToggleSection>
)

export default ToggleSection;
