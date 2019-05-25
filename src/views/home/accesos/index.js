import React from 'react';
import { NavLink } from 'react-router-dom';
import WpMenu from 'wp/menu';
import './styles.scss';

class HomeAccesos extends React.Component {
  render(){
    return(
      <section id='home-accesos'>
        <div className='wrapper-central'>
          <h1>Accesos</h1>
          <WpMenu location='accesos-menu-location' />
        </div>
      </section>  
    )
  }
}

export default HomeAccesos;
