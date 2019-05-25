import React from 'react';
import HomeInicio from './inicio';
import HomeAccesos from './accesos';

import HomeNovedades from './novedades';
import HomeDepartamentos from './departamentos';
import HomeServicios from './servicios';
import Footer from "views/footer";

class Home extends React.Component {
  render(){
    return(
      <section id='home'>
        <HomeInicio />
        <HomeAccesos />
        <HomeDepartamentos />
        <HomeServicios />
        <HomeNovedades />
        <Footer />
      </section>
    )
  }
}

export default Home;
