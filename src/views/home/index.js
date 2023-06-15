import React from 'react';
import HomeInicio from './inicio';
import HomeAccesos from './accesos';
import BuscarCarreras from './buscar-carreras';
import HomeNovedades from './novedades';
import HomeDepartamentos from './departamentos';
import HomeAgenda from './agenda';
import HomePlano from './plano';
import HomeSeparador from './separador';

class Home extends React.Component {
  render(){
    return(
      <section id='home'>
        <HomeInicio />
        <HomeNovedades />
        <HomeDepartamentos />
        <HomeAccesos />
        <HomeAgenda />
        <HomePlano />
        <BuscarCarreras />
        <HomeSeparador />
        <div></div>
      </section>
    )
  }
}

export default Home;
