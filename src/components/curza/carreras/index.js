import React from 'react';
import { getCarrerasDpto } from 'components/utils/curza_api';
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
            carerras: null
        });

        if(typeof(this.props.id_departamento) !== 'undefined' && this.props.id_departamento !== 0){
            
            var options = {
                departamento: this.props.id_departamento,
                debug: false,
            }
            //console.log("tipoDato",typeof(getCarrerasDpto));
            getCarrerasDpto(options).then(function(data){
                console.log(data);
            });
        }
    }

    render(){
        return (
            <section id='carreras-departamento' className={this.props.departamento} >

            </section>
        )
    }
}

export default CurzaCarreras;