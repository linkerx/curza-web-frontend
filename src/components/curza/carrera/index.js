import React from 'react';
import { getCarreraPorId, getAsignaturasPlan } from 'components/curza/api';
import './styles.scss';
import { Tabs, Tab } from 'components/tabs'

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
            if (info_carrera.plan_vigente !== null) {
                selectPlan = info_carrera.plan_vigente.id;
            } else {
                selectPlan = info_carrera.planes[0].id;
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
                                            <li key={index} className={this.state.selectedPlan === item.id ? "active" : null } onClick={() =>this.selectPlan.call(this,item.id)}>{item.ord}</li>
                                        )
                                    })

                                }
                            </ul>
                        </div>
                        <div className='info-carrera'>
                            <Tabs >
                                {
                                    this.state.carrera.perfil !== null && this.state.carrera.perfil !== "" ?
                                    <Tab name="perfil" title="Perfil" subtitle="">
                                        <div className="content-tabs" >{this.state.carrera.perfil}</div>
                                    </Tab> : null
                                }
                                {
                                    this.state.carrera.modalidades !== null ? 
                                    <Tab name="modalidad" title="Modalidades" subtitle="">
                                        <div className="content-tabs" >
                                            {this.state.carrera.modalidades.map(function(modalidad,index){
                                                return  (<div key={index}>{modalidad.nombre}</div> )
                                            })}
                                        </div>
                                    </Tab> : null
                                }
                                {
                                    this.state.carrera.alcance !== null && this.state.carrera.alcance !== "" ? 
                                    <Tab name="alcance" title="Alcance" subtitle="">
                                        <div className="content-tabs" >{this.state.carrera.alcance}</div>
                                    </Tab> : null
                                }
                            </Tabs>
                        </div>
                        <div className='plan-estudio'>
                            <div className="table-container" role="table" aria-label="Destinations">
                                <div className="flex-table header" role="rowgroup">
                                    <div className="flex-row first" role="columnheader">Orden</div>
                                    <div className="flex-row" role="columnheader">Asignatura</div>
                                    <div className="flex-row" role="columnheader">Cuatrimestre</div>
                                    <div className="flex-row" role="columnheader">Carga horaria</div>
                                    <div className="flex-row" role="columnheader">Correlativa</div>
                                </div>
                                {   this.state.asignaturas !== null &&
                                    this.state.asignaturas.sort(function(a,b) { if (a.orden > b.orden ) return 1; else return -1})
                                    .map(function (item, index) {
                                        return (
                                            <div className="flex-table row" role="rowgroup" key={index}>
                                                <div className="flex-row first" role="cell"><span className="flag-icon flag-icon-gb"></span>{item.orden}</div>
                                                <div className="column">
                                                    <div className="flex-row" >
                                                        <div className="flex-cell">{item.nombre}</div>
                                                        <div className="flex-cell">{item.cuatrimestre}</div>
                                                        <div className="flex-cell">{item.carga_total}</div>
                                                        <div className="flex-cell">
                                                            {
                                                                item.correlativas.map(function(correlativa,index){
                                                                    return <div key={index}>{correlativa.orden}</div>;
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
                    </div>
                }
                
            </section>
        )
    }
}

export default CurzaCarrera;