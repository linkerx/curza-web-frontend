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
                <li>Soledad Vercellino</li>
                <li>Marina La Vecchia</li>
                <li>Mónica Amado</li>
                <li>Pedro Dall' Armellina </li>
                <li>Maria Alasio</li>
                <li>Luis Albrecht </li>
                <li>Carlos Comolay</li>
                <li>Juan José Gallego</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Natalia Puertas</li>
              <li>Emiliano Sacchi</li>
              <li>Carolina Borrazas</li> 
              <li>aría Teresa Sánchez</li> 
              <li>Mirta Ferrero</li>
              <li>Gabriela Aschkar </li>
              <li>Graciela Valdebenito </li>
              <li>Deborat Maureira</li>
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
                <li>Juan Martínez</li>
                <li>Romina Hernández</li>
                <li>Karina Monticelli</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Marina Favalli</li>
              <li>Fabian Fernández</li>
              <li>Karina Awe Luca</li>
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
                <li>Quillen Luna</li>
                <li>Ain Luna</li>
                <li>Tamara Lefiu</li>
                <li>Yamila Flores</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Mariana Herrero</li>
              <li>Rocío Aguayo</li>
              <li>Trissil Sura</li>
              <li>Antonio Cariman</li>
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
                <li>Estrella Salamida</li>
              </ul>
          },
          {
            descripcion: 'Suplentes',
            a_cargo: 
            <ul>
              <li>Javier Correa</li>
            </ul>
          },
        ]
      }
    ]
    let array_secretarias = [
      {
        descripcion: 'Secreataría Académica',
        a_cargo: 'Dra. Soledad Vercellino',
        list: [
          {
            descripcion: "Dirección de Posgrado",
            a_cargo: "Mgter Alba Eterovich"
          }
        ]
      },
      {
        descripcion: 'Secreataría de Ciencia y Técnica',
        a_cargo: 'Esp. Lucrecia Avilés',
        list: []
      },
      {
        descripcion: 'Secretaría de Extensión Universitaria',
        a_cargo: 'Esp. Mónica Amado',
        list: []
      },
      {
        descripcion: 'Secretaría de Bienestar',
        a_cargo: 'Esp. Carlos Comolay',
        list: []
      },

      {
        descripcion: 'Dirección de Gestión Administrativa',
        a_cargo: 'Mg. Fabián Fernandez',
        list: []
      },
    ]

    this.setState({
      secretarias: array_secretarias,
      consejo_directivo: array_consejo_directivo
    })
  }
  render() {
    return (
      <section id='institucional'>
        <header>
          <div className='fondo'></div>
          <h1>Autoridades</h1>
        </header>
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
                  <p>DECANA:<br /><span>Dra. Adriana Goicochea</span></p>
                  <p>VICEDECANA:<br /><span>Mg. Cecilia Camera</span></p>
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
