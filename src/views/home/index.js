import React from 'react';
import HomeInicio from './inicio';
import HomeAccesos from './accesos';

import HomeNovedades from './novedades';
import HomeDepartamentos from './departamentos';
import HomeServicios from './servicios';

class Home extends React.Component {
  render(){
    return(
      <section id='home'>
        <HomeInicio />
        <HomeAccesos />
        <HomeDepartamentos />
        <HomeServicios />
        <HomeNovedades />
      </section>
    )
  }
}

export default Home;
