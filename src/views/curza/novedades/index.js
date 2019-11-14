import React from 'react';
import WpNetworkList from 'wp/network/list';
import './styles.scss';

class Novedades extends React.Component {
  render(){
    return(
      <section id='novedades'>
        <header>
          <div className='fondo'></div>
          <h1>Novedades</h1>
        </header>
          <WpNetworkList count='12' layout='image-first' imageRender='img' template={2} />
      </section>
    )
  }
}

export default Novedades;
