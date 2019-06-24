import React from 'react';
import Slider from 'wp/slider';
require('./styles.scss');

function Destacadas(){

  var DestQueries = [
    '_embed',
    'categories=8',
    'per_page=3'
  ];

  var sliderOptions = {
      autoListCount: true,
      listCount: 0,
      listImgSize: 'thumbnail',
      pageCount: 1,
      pageImgSize: 'full',
      time: 5000,
      containerClass: ''
  }

  return (
     <Slider type='posts' queries={DestQueries} list={true} options={sliderOptions} />
  )
}

export default Destacadas;
