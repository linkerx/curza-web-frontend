import React from 'react';
import { getCarrerasDpto } from 'components/curza/api';
import Card from 'components/card';
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
                <h2>Carreras del Departamento</h2>
                <ul>
                { this.state.carreras !== null &&
                    this.state.carreras.map(function(item, index){
                        if(!item.es_titulo_intermedio){
                            var url = urlBase + item.id;
                            return (

                                <Card key={index} 
                            title={item.nombre} 
                            icons={item.modalidades ? item.modalidades.map( (element) => {
                                if(element) {
                                  if (element.nombre === "Presencial") 
                                  return {'i': "fas fa-chalkboard-teacher" , 'text':'Modalidad presencial'}
                                  else if( element.nombre === "Semipresencial") 
                                    return {'i': "fas fa-laptop" , 'text': 'Modalidad semipresencial'}
                                  else 
                                    return ("fas fa-chalkboard")
                                }
                                return null;
                               
                            }): null }
                            
                            readMore={url}
                            brochure={item.related_files.brochure}
                        >
                               
                            {item.duracion_total_anos < 0 ? null :"Duración total: "+  item.duracion_total_anos+" años"}
                        </Card>

                          )
                        } else { return null; }
                    })
                }
                </ul>
            </section>
        )
    }
}

export default CurzaCarreras;
