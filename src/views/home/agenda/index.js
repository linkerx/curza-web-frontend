import React from 'react';
import WpNetworkSchedule from 'wp/network/schedule';
import './styles.scss';

class HomeAgenda extends React.Component {
  render(){
    return(
      <section id='home-agenda'>
        <div className='wrapper-central'>
          <h1>Próximos Eventos</h1>
          <WpNetworkSchedule count='5' layout='image-first' imageRender='img' template={3} />
        </div>
      </section>
    )
  }
}

export default HomeAgenda;
