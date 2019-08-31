import React from 'react'

import './styles.scss';
import Filter from 'components/filter'
import Card  from 'components/card'


class OfertaAcademica extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      carreras: this.props.carreras,
      debug: true,
    }
    
  }
  
  render() {

    return (
      <section id='oferta-academica'>
        <Filter onChange={this.props.onChange} />
        {this.props.carreras ?
        <div className="wrapper-central">
          <h2>Oferta de grado</h2>
          {
            this.props.carreras.map((carreraxDpto, index) => {
              return (
                <div key={index}>
                  <h3>{carreraxDpto.length > 0 ? carreraxDpto[0].departamento.nombre : null }</h3>
                  <div className="flex-ofertas" >
                    {carreraxDpto ? carreraxDpto.map((child,index) => {
                      return (
                        <Card key={index} 
                            title={child.nombre} 
                            icons={child.modalidades ? child.modalidades.map( (element) => {
                                if(element) {
                                  if (element.nombre === "Presencial") 
                                  return {'i': "fas fa-child" , 'text':'Posee modalidad presencial'}
                                  else if( element.nombre === "Semipresencial") 
                                    return {'i': "fas fa-broadcast-tower" , 'text': 'Posee modalidad semipresencial'}
                                  else 
                                    return ("fas fa-chalkboard")
                                }
                               
                            }): null }
                            readMore={ child.departamento ? 
                             ( child.departamento.nombre === "Psicopedagogía" ? 
                                "psicopedagogia/carreras/"+child.id : 
                              child.departamento.nombre === "Enfermería" ?
                                "enfermeria/carreras/"+child.id :
                              child.departamento.nombre === "Gestión Agropecuaria" ?
                                "agropecuaria/carreras/"+child.id :
                              child.departamento.nombre === "Estudios Políticos" ?
                                "politicos/carreras/"+child.id :
                              child.departamento.nombre === "Lengua, Literatura y Comunicación" ?
                               "lengua-comunicacion/carreras/"+child.id :
                              child.departamento.nombre === "Ciencia y Tecnología" ?
                                "tecnologia/carreras/"+child.id :
                              child.departamento.nombre === "Administración Pública" ?
                                "administracion/carreras/"+child.id :null )
                              : null
                            } >
                            {child.duracion_total_anos < 0 ? null :"Duración total: "+  child.duracion_total_anos+" años"}
                        </Card>    
                      )
                    }) : null}
                  </div>
                </div>
              )
            }) 
          }
            
          
        </div>
        : null }
      </section>
    )
  }
}

export default OfertaAcademica;