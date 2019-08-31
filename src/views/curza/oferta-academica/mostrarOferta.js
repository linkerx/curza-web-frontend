import React, { Component } from 'react';
import { getQueryProgramas, getCarrerasDpto } from 'components/curza/api';
import OfertaAcademica from './'
class MostrarOferta extends Component {
    constructor() {
      super()
      
      this.state = {
        carreras: [],
        ofertasFiltrada: []
      }
      this.getCarreras = this.getCarreras.bind(this)
    }
  
    componentWillMount() {
      this.getCarreras()
      if (this.state.debug)
        console.log("Carreras",this.state.carreras)   
      this.setState({
        ofertasFiltrada: this.state.carreras
      })
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
            if (this.state.carreras.length == 0 ){
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
        ofertasFiltrada
      })
    }
  
    render() {
      return (
        <OfertaAcademica carreras={this.state.ofertasFiltrada} match={this.props.match} onChange={this.filtrarOfertas} />
      )
    }
  }
  
  export default MostrarOferta