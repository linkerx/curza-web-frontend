import React from 'react';
import WpNetworkList from 'wp/network/list';
import { NavLink } from 'react-router-dom';
import './styles.scss';

class HomeNovedades extends React.Component {
  render(){
    return(
      <section id='home-novedades'>
        <h1>Últimas Publicaciones</h1>
        <div className='wrapper-central'>
          <WpNetworkList count='3' layout='image-first' imageSize='thumbnail' imageRender='img' template={2} />
        </div>
        <div className='link-todas'>
          <NavLink to='/novedades'>Ver todas las novedades</NavLink>
        </div>
      </section>
    )
  }
}

export default HomeNovedades;
