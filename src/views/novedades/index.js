import React from 'react';
import WpNetworkList from 'wp/network/list';
import './styles.scss';

class Novedades extends React.Component {
  render(){
    return(
      <section id='novedades'>
        <h1>Novedades</h1>
        <div className='wrapper-central'>
          <WpNetworkList count='12' layout='image-first' />
        </div>
      </section>
    )
  }
}

export default Novedades;
