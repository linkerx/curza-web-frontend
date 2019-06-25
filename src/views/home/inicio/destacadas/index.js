import React from 'react';
import Slider from 'wp/slider';
require('./styles.scss');

function Destacadas(){

  var DestQueries = [
    '_embed',
    'categories=2',
    'per_page=5'
  ];

  var sliderOptions = {
      autoListCount: true,
      listCount: 0,
      listImgSize: 'thumbnail',
      pageCount: 1,
      pageImgSize: 'full',
      time: 5000,
      containerClass: '',
      imageLink: true,
      showContent: true
  }

  return (
     <Slider type='posts' queries={DestQueries} list={true} options={sliderOptions} />
  )
}

export default Destacadas;
