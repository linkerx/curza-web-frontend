import React from 'react';
import { getCarrerasDpto } from 'components/curza/api';
import { Link } from 'react-router-dom';
import './styles.scss';

class CurzaCarreras extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            carreras: null
        }

        this.updateCarreras = this.updateCarreras.bind(this);
    }

    componentDidMount() {
        this.updateCarreras();
    }   

    updateCarreras(){
        this.setState ({
            carreras: null
        });

        if(typeof(this.props.id_departamento) !== 'undefined' && this.props.id_departamento !== 0){
            
            var options = {
                departamento: this.props.id_departamento,
                debug: false,
            }
            //console.log("tipoDato",typeof(getCarrerasDpto));
            getCarrerasDpto(options).then(function(data){
                this.setState({
                    carreras: data
                });
            }.bind(this));
        }
    }

    render(){
        console.log(this.state.carreras);
        var urlBase = '/'+this.props.departamento+'/carreras/';
        return (
            <section id='carreras-departamento' className={this.props.departamento} >
                <ul>
                { this.state.carreras !== null &&
                    this.state.carreras.map(function(item, index){
                        var url = urlBase + item.id;
                        return (
                            <li key={index} ><Link to={url}>{item.nombre}</Link></li>
                        )
                    })
                }
                </ul>
            </section>
        )
    }
}

export default CurzaCarreras;