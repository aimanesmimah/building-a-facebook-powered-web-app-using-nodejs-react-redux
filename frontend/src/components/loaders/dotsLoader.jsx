import React, { Component } from 'react'
import MySVG from './mySVG'; 
import anime from 'animejs';
import {LoaderItemsList,LoaderItem} from '../../styledComponents/styledComponents';


class DotsLoader extends Component {
  constructor(props){
    super(props);
     this.state ={

     }

     this.items = [];
  }

  componentWillMount() {
    const {length,color} = this.props ;
    for(var i=0; i < length ; i++){

       this.items.push(
           <LoaderItem >
             <div className="loader-item"><MySVG color={color}/></div>
           </LoaderItem>
       );
     }
  }

  componentDidMount(){

    this.anime = anime({
      targets: '.loader-item',
      translateY : [
        { value: -9, duration: 280 },
        { value: 9, duration: 280 }
      ],
      duration: 700,
      loop : true,

      delay : function(el,i,l){
        return i*300;
      },
      easing:'easeInOutCirc'
   });
  }

  render() {
    return(
        <LoaderItemsList>
          {this.items}
        </LoaderItemsList>
    )
  }
}

export default DotsLoader;
