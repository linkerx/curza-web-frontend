import React from 'react';
import { getCarreraPorId, getAsignaturasPlan } from 'components/curza/api';
import './styles.scss';

class CurzaCarrera extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            carrera: null,
            selectedPlan: null,
            asignaturas: null,
        }
        this.getAll = this.getAll.bind(this);
        this.getInfoCarrera = this.getInfoCarrera.bind(this);
        this.selectPlan = this.selectPlan.bind(this);
    }

    componentDidMount() {
        this.getAll();
    }

    componentDidUpdate(prevProps){
      if(prevProps.location.pathname !== this.props.location.pathname) {
        this.getAll();
      }
    }

    getAll(){
        this.setState({
            carrera: null,
            selectedPlan: null,
            asignaturas: null
        });
 
        if(typeof(this.props.match.params.slug_carrera) !== 'undefined') {
            this.getInfoCarrera(this.props.match.params.slug_carrera);
        }
    }

    getInfoCarrera(carrera){
        var options_carrera = {
            carrera: carrera
        }
        getCarreraPorId(options_carrera).then(function(info_carrera){
            var selectPlan = null;
            if(info_carrera.plan_vigente !== null){
                selectPlan = info_carrera.plan_vigente.id;
            } else {
              selectPlan = info_carrera.planes[0].id;
            }
            var options_asignatura = {
                plan: selectPlan
            }
            getAsignaturasPlan(options_asignatura).then(function(info_asignaturas){
                console.log("Datos Carrera: ",info_carrera,info_asignaturas);
                this.setState({
                    carrera: info_carrera,
                    selectedPlan: selectPlan,
                    asignaturas: info_asignaturas
                });
            }.bind(this))                
        }.bind(this))
    }

    selectPlan(plan){
        var options_asignatura = {
            plan: plan
        }
        getAsignaturasPlan(options_asignatura).then(function(info_asignaturas){
            this.setState({
                selectedPlan: plan,
                asignaturas: info_asignaturas
            });
        }.bind(this))                
    }

    render(){
        return (
            <section id='curza-carrera'>
                { this.state.carrera !== null &&
                    <div>
                        <h2>{this.state.carrera.nombre}</h2>
                        <div className='planes'>
                            <span>Plan:</span>
                            <ul>
                            {
                                this.state.carrera.planes.map(function(item,index){
                                    return(
                                        <li key={index} onclick={() => this.selectPlan(item.id)}>{item.ord}</li>
                                    )
                                })

                            }    
                            </ul>
                        </div>
                        <div className='info-carrera'>
                            <div className='perfil'>
                                <label>Perfil Profesional:</label>
                                <span>{this.state.carrera.perfil}</span>
                            </div>
                        </div>
                        <div className='plan-estudio'>
                            <ul>
                            { this.state.asignaturas !== null &&
                                this.state.asignaturas.map(function(item,index){
                                    return (
                                        <li key='index'>{item.nombre}</li>
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                }
            </section>
        )
    }
}

export default CurzaCarrera;