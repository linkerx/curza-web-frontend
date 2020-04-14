import React from 'react';
import WpMenu from 'wp/menu';
import './styles.scss';

class HomeProyectos extends React.Component {
  render(){
    return(
      <section id='home-proyectos'>
        <div className='wrapper-central'>
          <h1>Proyectos Institucionales</h1>
          <WpMenu location='proyectos-menu-location' />
        </div>
      </section>  
    )
  }
}

export default HomeProyectos;
