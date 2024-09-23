import React from 'react'
import './styles.scss';
import Card  from 'components/card'
import WpApi from 'wp/api';

class OfertaAcademica extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      carreras: this.props.carreras,
      debug: false,
      listUrlDptos: null
    }
    this.updateURLs = this.updateURLs.bind(this);

  }
  
  componentDidMount(){
    this.updateURLs();
  }
  /**
   * Obtiene los sitios de cada departamento
   * modifica el estado listUrlDptos con un arreglo de dptos
   * utiliza WPApi 
   */
  updateURLs(){
    this.setState(function () {
      return {
        listUrlDptos: null
      }
    });
    var opts = {
      location: 'departamentos-menu-location' ,
    }

    WpApi.getMenuIdByLocation(opts)
      .then(function(dptos) {
        this.setState({
            listUrlDptos: dptos ? dptos.items : null
        });
      }.bind(this));
  }
  /**
   * Relaciona los sitios de WP de cada dpto con la carrera
   * esto sirve para crear la URL hacia la información de la misma
   * @param {child} c  información de la carrera
   * @return {String}
   */
  urlDpto = (c) => {
    let nombreDpto = c.departamento.nombre.toLowerCase()
    if (this.state.listUrlDptos) 
    { 
      
      this.state.listUrlDptos.forEach(departamentoWP => {
        if(nombreDpto.indexOf(departamentoWP.title.toLowerCase()) !== -1){
          nombreDpto = departamentoWP.url+"/carreras/"+c.id 
        }
      }) ;
    } else {
      nombreDpto = "#"
    }
    return nombreDpto  
  }
  render() {
    return (
      <section id='oferta-academica'>
         <div className="wrapper-central">
          { this.props.carreras ?
            this.props.carreras.map((carreraxDpto, index) => {
              return (
                <div key={index}>
                  {carreraxDpto.length > 0 ? <h2> {carreraxDpto[0].departamento.nombre}</h2> : null }
                  <div className="flex-ofertas" >
                    {carreraxDpto ? carreraxDpto.map((child,index) => {
                      return (
                        <Card key={index} 
                            title={child.nombre} 
                            icons={child.modalidades ? child.modalidades.map( (element) => {
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
                            
                            readMore={this.urlDpto(child)}
                            brochure={child.hasOwnProperty('related_files') && child.related_files.hasOwnProperty('brochure') && child.related_files.brochure}
                        >
                               
                            {child.duracion_total_anos < 0 ? null :"Duración total: "+  child.duracion_total_anos+" años"}
                        </Card>    
                      )
                    }) : null}
                  </div>
                </div>
              )
            }) 
            : 
            <h2 className="no-result">No se encontraron resultados con: 
              <span>{document.getElementById('filter') ? document.getElementById('filter').value : null }</span>
            </h2> 
          }
        </div>
      </section>
    )
  }
}

export default OfertaAcademica;
