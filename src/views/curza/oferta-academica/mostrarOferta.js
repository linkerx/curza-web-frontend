import React, { Component } from 'react';
import { getQueryProgramas, getCarrerasDpto } from 'components/curza/api';
import OfertaAcademica from './';
import Filter from 'components/filter';
import NavLink from 'react-router-dom';
class MostrarOferta extends Component {
  constructor(props) {
    super(props)
    let propsFilters = null
    if (props && props.location && props.location.state) {
      propsFilters = props.location.state.filtro
    }
    this.state = {
      carreras: [],
      ofertasFiltrada: [],
      filtro: propsFilters ? propsFilters : "",
      text: propsFilters ? propsFilters : "",
      listUrlDptos: null
    }
    this.getCarreras = this.getCarreras.bind(this)
    this.filtrarOfertas = this.filtrarOfertas.bind(this)
  }


  componentWillMount() {
    this.getCarreras()
    if (this.state.debug)
      console.log("Carreras", this.state.carreras)
    this.setState({
      ofertasFiltrada: this.state.carreras,
    })
  }
  componentWillReceiveProps(nprops) {
    this.filtrarOfertas(this.state.filtro)
  }

  getCarreras() {
    let options = {
      name: "departamento",
      debug: this.state.debug
    }
    getQueryProgramas(options).then(function (departamentos) {
      if (this.state.debug)
        console.log("Cant. Departamentos", Object.keys(departamentos).length)
      for (let index = 1; index <= Object.keys(departamentos).length; index++) {
        options = {
          departamento: index,
          debug: this.state.debug
        }
        getCarrerasDpto(options).then(function (addCarreras) {
          if (this.state.carreras.length === 0) {
            this.setState({
              carreras: [addCarreras],
              ofertasFiltrada: [addCarreras]
            })
          } else {
            this.setState(prevState => ({
              carreras: [...prevState.carreras, addCarreras],
              ofertasFiltrada: [...prevState.carreras, addCarreras],
            }))
          }
        }.bind(this))

      }
    }.bind(this))
  }

  /**
   * Lógica de búsqueda en oferta académica
   * @return {array} si coincide con la búsqueda entonces es parte de este arreglo
   * @param {string} filtro cadena de búsqueda
   */
  filtrarOfertas = (filtro) => {
    let ofertasFiltrada = this.state.carreras
    ofertasFiltrada = ofertasFiltrada.map((carrerasDpto) => {
      return carrerasDpto.filter((oferta) => {
        let nombre = oferta.nombre.toLowerCase()
        return nombre.indexOf(
          filtro.toLowerCase()) !== -1
      })
    })
    this.setState({
      ofertasFiltrada,
      text: filtro,
      filtro: filtro
    })
  }

  render() {
    return (
      <div id="mostrar-oferta">
        <header>
          <div className='fondo'></div>
          <h1>Oferta de grado</h1>
          <Filter onChange={this.filtrarOfertas} text={this.state.text} />
        </header>
        <OfertaAcademica
          carreras={this.state.ofertasFiltrada}
          match={this.props.match}
        />
       <NavLink to='/posgrado'>Oferta de Posgrado</NavLink>
      </div>
    )
  }
}

export default MostrarOferta