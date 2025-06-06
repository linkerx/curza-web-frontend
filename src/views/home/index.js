import React from "react";
import HomeInicio from "./inicio";
import HomeAccesos from "./accesos";
import BuscarCarreras from "./buscar-carreras";
import HomeNovedades from "./novedades";
import HomeDepartamentos from "./departamentos";
import HomeAgenda from "./agenda";
import HomeNodos from "./nodos";
import HomeSeparador from "./separador";
import Plano from "./plano";
class Home extends React.Component {
  render() {
    return (
      <section id="home">
        <HomeInicio />
        <HomeAccesos />
        <HomeNovedades />
        <HomeAgenda />
        <HomeDepartamentos />
        <Plano />
      </section>
    );
  }
}

export default Home;
