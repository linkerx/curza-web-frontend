import React from 'react'
import './styles.scss'
import { Link } from "react-router-dom";
class BuscarCarreras extends React.Component {
    constructor() {
        super()
        
        this.state = {
          filtro: ""
        }
    }
    handleChange = input =>  {
        this.setState({
            'filtro': input.target.value
        })
    }
   
    render(){
        return (
            <div id="buscar-carreras">
                <div className="wrapper-central">
                        <h1>Buscá tu carrera</h1>
                        <input type="text" name="filter" 
                            onChange={this.handleChange} 
                            value={this.state.filtro}>
                        </input>
                        <Link className="button" to={{
                            pathname:'/oferta-academica',
                            state: {
                                filtro: this.state.filtro,
                            }
                            }}> Buscar
                        </Link>
                </div>
            </div>
        )
    }
}

export default BuscarCarreras