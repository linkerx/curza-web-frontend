import React from 'react';
import { Tabs, Tab } from 'components/tabs'
import './styles.scss';

class Autoridades extends React.Component {

  constructor() {
    super()
    this.state = {
      secretarias: [],
      consejo_directivo: [],
      debug: false,
    }
  }
  componentDidMount() {
    this.getAutoridades();
  }

  getAutoridades() {
    let array_consejo_directivo = [
      {
        descripcion: 'Claustro Docentes',
        list: [
          {
            descripcion: 'Titulares',
            a_cargo: 
              <ul>
                <li>Goicochea, Adriana</li>
                <li>Silvia, Miguel Ángel</li>
                <li>Ocampo, María Emilia</li>
                <li>Mazella, Nicolás Bernardo</li>
                <li>Sanchez, María Daniela</li>
                <li>Pellejero, Irma Graciela</li>
                <li>Pose, Hernán Daniel</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Vilca, Hugo Víctor</li>
              <li>Bonardo, Dora Armonía</li>
              <li>Bolletta, Viviana Noemí</li>
              <li>Rouseot, Bibiana Raquel</li>
              <li>Avils, Lucrecia María</li>
              <li>Vercellino, Soledad</li>
              <li>Bohuier, Rodolfo Abel</li>
              <li>Rosbaco, Nicolas Gustavo</li>
            </ul>
          },
        ]
      },
      {
        descripcion: 'Claustro No-Docentes',
        list: [
          {
            descripcion: 'Titulares',
            a_cargo: 
              <ul>
                <li>Fernández, Fabián Nelson</li>
                <li>Martínez, Juan Osca</li>
                <li>Hernández, Romina Soledad</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Bozal, Alejandra Noemí</li>
              <li>Ercilape, Fabián Edgardo</li>
              <li>Caso, Francisco José</li>
            </ul>
          },
        ]
      },
      {
        descripcion: 'Claustro Estudiantes',
        list: [
          {
            descripcion: 'Titulares',
            a_cargo: 
              <ul>
                <li>Paz, Matías German</li>
                <li>Grazioli, Facundo Iván</li>
                <li>Marian, Pavlin Tomas</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Navarro, Milton Daniel</li>
              <li>Miranda, Gonzalo Javier</li>
              <li>Bonino, Agustín</li>
            </ul>
          },
          
        ]
      },
      {
        descripcion: 'Claustro Graduados',
        list: [
          {
            descripcion: 'Titulares',
            a_cargo: 
              <ul>
                <li>Juarez, Elvira Mercedes</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Madariaga, Chacon Lisa Lorena</li>
            </ul>
          },
        ]
      }
    ]
    let array_secretarias = [
      {
        descripcion: 'Secreataría Académica',
        a_cargo: 'Lic. Viviana Bolletta',
        list: [
          {
            descripcion: "Dirección Académica",
            a_cargo: "Lic. Irma Guerra"
          },
          {
            descripcion: "Departamento Docente",
            a_cargo: "Juan Martinez"
          },
          {
            descripcion: "Departamento de Alumnos",
            a_cargo: "Romina Hernandez"
          }
        ]
      },
      {
        descripcion: 'Secreataría de Ciencia y Técnica',
        a_cargo: 'Mgter. Dora Bonardo',
      },

      {
        descripcion: 'Secreataría General'
      },
      {
        descripcion: 'Secretaría de Extensión Universitaria',
        a_cargo: 'Mgter. Gabriela Aschkar'
      }

    ]


    this.setState({
      secretarias: array_secretarias,
      consejo_directivo: array_consejo_directivo
    })
  }
  render() {
    return (
      <section id='institucional'>
        <div className="wrapper-central">
          {
            this.state.consejo_directivo ?
              <Tabs  close="yes">
                <Tab name="Consejo Directivo" title="Consejo Directivo">
                  <Tabs initial="first">
                    {this.state.consejo_directivo.map((object, index) => {
                      return (
                        <Tab key={index} name={object.descripcion} title={object.descripcion} subtitle={object.a_cargo}>
                          {
                            object.list ? object.list.map((object, index) => {
                              return (
                                <div key={index} className="inst-fila">
                                  <div className="inst-card">
                                    <h4>{object.descripcion}</h4>
                                    <p>{object.a_cargo}</p>
                                  </div>
                                </div>
                              )
                            }) : null
                          }
                        </Tab>
                      )
                    })}
                  </Tabs>
                </Tab>
              </Tabs>
              : null
          }

          <Tab name="decanato">
            <div>
              <div className="inst-fila unica">
                <div className="inst-card">
                  <h3>DECANATO</h3>
                  <p>DECANO:<br /><span>Mgter. Claudio Mennecozzi</span></p>
                  <p>VICEDECANA:<br /><span>Lic. Gabriela Aschkar</span></p>

                </div>
              </div>
            </div>
          </Tab>

          {
            this.state.secretarias ?
              <Tabs initial="first">
                {this.state.secretarias.map((object, index) => {
                  return (
                    <Tab key={index} name={object.descripcion} title={object.descripcion} subtitle={object.a_cargo}>
                      {
                        object.list ? object.list.map((object, index) => {
                          return (
                            <div key={index} className="inst-fila">
                              <div className="inst-card">
                                <h3>{object.descripcion}</h3>
                                <p>{object.a_cargo}</p>
                              </div>
                            </div>
                          )
                        }) : null
                      }
                    </Tab>
                  )
                })}
              </Tabs>
              : null
          }

        </div>
      </section>
    )
  }
}

export default Autoridades;
