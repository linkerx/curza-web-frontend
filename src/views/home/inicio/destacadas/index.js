import React from 'react';
import Slider from 'wp/network/slider-featured';
require('./styles.scss');

function Destacadas(){
  return (
     <Slider template={3} showContent='true'/>
  )
}

export default Destacadas;
