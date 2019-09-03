import React, { Component } from 'react';
import { getQueryProgramas, getCarrerasDpto } from 'components/curza/api';
import OfertaAcademica from './'
import Filter from 'components/filter'

class MostrarOferta extends Component {
    constructor(props) {
      super(props)
      let propsFilters = null
      if( props && props.location && props.location.state){
        propsFilters = props.location.state.filtro
      }
      this.state = {
        carreras: [],
        ofertasFiltrada: [],
        filtro:  propsFilters ? propsFilters : "",
        text: propsFilters ? propsFilters :""
      }
      this.getCarreras = this.getCarreras.bind(this)
      this.filtrarOfertas = this.filtrarOfertas.bind(this)
    }
   
  componentWillMount() {
    this.getCarreras()
    if (this.state.debug)
      console.log("Carreras",this.state.carreras)   
    this.setState({
      ofertasFiltrada: this.state.carreras,
    }) 
  }
  componentWillReceiveProps(nprops){
    this.filtrarOfertas(this.state.filtro)
  }

  getCarreras(){
    let options = {
      name:  "departamento",
      debug:this.state.debug
    }
    getQueryProgramas(options).then(function (departamentos) {
      if (this.state.debug)
        console.log("Cant. Departamentos",Object.keys(departamentos).length)  
      for (let index = 1; index <= Object.keys(departamentos).length; index++) {
          options = {
            departamento:  index,
            debug:this.state.debug
          }
          getCarrerasDpto(options).then(function (addCarreras) {
            if (this.state.carreras.length === 0 ){
              this.setState({
                carreras: [addCarreras],
                ofertasFiltrada:[addCarreras]
              })                
            } else {
              this.setState(prevState => ({
                carreras: [...prevState.carreras,addCarreras],
                ofertasFiltrada: [...prevState.carreras,addCarreras],
              }))
            }
          }.bind(this))
          
        }
    }.bind(this))
  }

  
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
        text:filtro,
        filtro: filtro
      })
    }
  
    render() {
      return (
        <div id="mostrar-oferta">
          <Filter onChange={this.filtrarOfertas} text={this.state.text}  />
          <OfertaAcademica 
            carreras={this.state.ofertasFiltrada} 
            match={this.props.match} 
          />
        </div>
      )
    }
  }
  
  export default MostrarOferta