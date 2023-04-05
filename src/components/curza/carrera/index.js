import React from 'react';
import { getCarreraPorId, getAsignaturasPlan } from 'components/curza/api';
import './styles.scss';

class CurzaCarrera extends React.Component {
    constructor(props) {
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

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.getAll();
        }
    }

    getAll() {
        this.setState({
            carrera: null,
            selectedPlan: null,
            asignaturas: null
        });

        if (typeof (this.props.match.params.slug_carrera) !== 'undefined') {
            this.getInfoCarrera(this.props.match.params.slug_carrera);
        }
    }

    getInfoCarrera(carrera) {
        var options_carrera = {
            carrera: carrera
        }
        getCarreraPorId(options_carrera).then(function (info_carrera) {
            var selectPlan = null;
            // verificar si hay plan vigente y si el mismo está activo
            // sino elige el primer plan que esté vigente
            if (info_carrera.plan_vigente !== null && info_carrera.plan_vigente.activo ) {
                selectPlan = info_carrera.plan_vigente.id;
            } else {
                info_carrera.planes.forEach(plan => {
                    if(plan.activo ) {
                        selectPlan = plan.id;
                        return;
                    }
                });

            }
            var options_asignatura = {
                plan: selectPlan
            }
            getAsignaturasPlan(options_asignatura).then(function (info_asignaturas) {
                //console.log("Datos Carrera: ", info_carrera, info_asignaturas);
                this.setState({
                    carrera: info_carrera,
                    selectedPlan: selectPlan,
                    asignaturas: info_asignaturas
                });
            }.bind(this))
        }.bind(this))
    }

    selectPlan(plan) {
        var options_asignatura = {
            plan: plan
        }
        getAsignaturasPlan(options_asignatura).then(function (info_asignaturas) {
            this.setState({
                selectedPlan: plan,
                asignaturas: info_asignaturas
            });
        }.bind(this))
    }

    render() {
        return (
            <section id='curza-carrera'>
                {this.state.carrera !== null &&
                    <div>
                        <h2>{this.state.carrera.nombre}</h2>
                        <div className='planes'>
                            <span>Plan:</span>
                            <ul>
                                {
                                    this.state.carrera.planes.map((item, index) => {
                                        return (
                                            <div>
                                                <li key={index} 
                                                    className={this.state.selectedPlan === item.id ? "active plan-item" : "plan-item" } 
                                                    onClick={() =>this.selectPlan.call(this,item.id)}>{item.ordenanza}
                                                </li>
                                                <p className={this.state.selectedPlan === item.id ? "display-plan" : "no-display-plan"}>
                                                    { item.archivo === "" ? 
                                                        <i title="Plan no disponible" className="far fa-file"></i> : 
                                                        <a href={item.archivo} title="Descargar plan" target="_blank">
                                                            <i className="fas fa-file-download"></i> 
                                                        </a>
                                                    }
                                                </p>
                                            </div>
                                        )
                                    })

                                }
                            </ul>
                        </div>
                        <div className='info-carrera'>
                            {this.state.carrera.fundamentacion ? 
                                <div><span>Fundamentación:</span> <div dangerouslySetInnerHTML={{__html: this.state.carrera.fundamentación}}></div></div>
                                :
                                null
                            }
                            {this.state.carrera.perfil ? 
                                <p><span>Perfil:</span> <div dangerouslySetInnerHTML={{__html: this.state.carrera.perfil}}></div></p>
                                :
                                null
                            }
                            {this.state.carrera.alcance ? 
                                <p><span>Alcance: </span><p dangerouslySetInnerHTML={{__html: this.state.carrera.alcance}}></p></p>
                                :
                                null
                            }
                            <p ><span>Modalidad:</span> 
                                <ul> 
                                    {
                                        this.state.carrera.modalidades !== null && 
                                        this.state.carrera.modalidades.map(
                                            function(modalidad,index){
                                                return  (
                                                    <li className="modalidad" 
                                                        key={index}>{modalidad.nombre}
                                                    </li>
                                                )
                                        })
                                    }
                                </ul>
                            </p>
                            
                        </div>
                        { this.state.asignaturas !== null && this.state.asignaturas.length > 0 ?
                            <div className='plan-estudio'>
                                <div className="table-container" role="table" aria-label="Destinations">
                                    <div className="flex-table header" role="rowgroup">
                                        <div className="flex-row first" role="columnheader">Orden</div>
                                        <div className="flex-row" role="columnheader">Asignatura</div>
                                        <div className="flex-row" role="columnheader">Cuatrimestre</div>
                                        <div className="flex-row" role="columnheader">Carga horaria</div>
                                        <div className="flex-row" role="columnheader">Correlativa/s</div>
                                        <div className="flex-row" role="columnheader">Programa/s</div>
                                    </div>
                                    {  // primero ordena por numero de orden y luego recorre
                                        this.state.asignaturas.sort(function(a,b) { if (a.orden > b.orden ) return 1; else return -1})
                                        .map(function (item, index,array) {
                                            let cursado = ""
                                            switch (item.cuatrimestre) {
                                                case 0:
                                                    cursado = "Anual"
                                                    break;
                                                case 1:
                                                    cursado = "Primero"
                                                    break;
                                                case 2:
                                                    cursado = "Segundo"
                                                    break;
                                                default:
                                                    cursado = ""
                                                    break;
                                            }
                                            return (
                                                
                                                <div className={
                                                    // si la materia siguiente es de otro año entonces clase: fin-ano
                                                        (array[index+1] !== undefined 
                                                        && item.ano_dictado < array[index+1].ano_dictado) ?  
                                                        "flex-table row fin-ano" : "flex-table row"
                                                    } role="rowgroup" key={index}>
                                                    <div className="flex-row first" role="cell"><span className="flag-icon flag-icon-gb"></span>{item.orden}</div>
                                                    <div className="column">
                                                        <div className="flex-row" >
                                                            <div className="flex-cell">{item.nombre}</div>
                                                            <div className="flex-cell">{cursado}</div>
                                                            <div className="flex-cell">{item.carga_total}</div>
                                                            <div className="flex-cell">
                                                                {
                                                                    item.correlativas.map(function(correlativa,index){
                                                                        return <div key={index}>
                                                                            {correlativa.orden} 
                                                                            
                                                                        </div>;
                                                                    })
                                                                    
                                                                }
                                                                {
                                                                    item.requisitos  ? 
                                                                        item.requisitos.length <= 60 ?
                                                                        <div dangerouslySetInnerHTML={{__html: item.requisitos}}></div> 
                                                                        :
                                                                        <div>
                                                                        <i className="clickPopover fas fa-info-circle" ></i> 
                                                                        <div  className="popover__content">
                                                                            <div  className="popover__message" dangerouslySetInnerHTML={{__html: item.requisitos}}></div> 
                                                                        </div>
                                                                        </div>
                                                                    :
                                                                        null
                                                                }
                                                                
                                                            </div>
                                                            <div className="flex-cell">
                                                                {
                                                                    item._links.exports &&
                                                                        Object.entries(item._links.exports).map(([key, value]) => {
                                                                            return(
                                                                                <div><a href={value.href}>{key}</a></div>
                                                                            )
                                                                        })
                                                                }
                                                                

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div> 
                            : 
                            null 
                        }
                    </div>
                }
                
            </section>
        )
    }
}

export default CurzaCarrera;
