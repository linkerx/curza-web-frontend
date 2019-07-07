import React from 'react';
import { Tabs, Tab } from 'views/curza/institucional/tabs'
import './styles.scss';

class Institucional extends React.Component {


  render() {
    return (
      <section id='institucional'>
        <div className="wrapper-central">
          <Tabs close="yes" >
            <Tab name="consejo_directivo" title="Consejo Directivo" subtitle="">
              <div>
                <div className="inst-fila">
                  <div className="inst-card">
                    <h3>Departamento Docente</h3>
                    <p>Juan Martinez</p>
                  </div>
                  <div className="inst-card">
                    <h3>Departamento Alumnos</h3>
                    <p>Romina Hernandez</p>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>

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
          <Tabs
            initial="pepe" >
            <Tab name="pepe" title="Secretaría Académica" subtitle="Lic. Viviana Bolletta">
              <div>
                <div className="inst-fila">
                  <div className="inst-card">
                    <h3>Dirección Académica</h3>
                    <p>Lic. Irma Guerra</p>
                  </div>
                </div>
                <div className="inst-fila">
                  <div className="inst-card">
                    <h3>Departamento Docente</h3>
                    <p>Juan Martinez</p>
                  </div>
                  <div className="inst-card">
                    <h3>Departamento Alumnos</h3>
                    <p>Romina Hernandez</p>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab
              defaultClass="unstilo"
              name="d"
              title="Secretaría de Ciencia y Técnica"
              subtitle="Mgter. Dora Bonardo">
              Contenido 2
              </Tab>
            <Tab
              name="sLalal"
              title="Secretaría General" >
              Contenido
              </Tab>
            <Tab
              defaultClass="unstilo"
              name="s"
              title="Secretaría de Extensión Universitaria"
              subtitle="Mgter. Gabriela Aschkar">
              <Tabs initial="s">
                <Tab
                  defaultClass="unstilo"
                  name="s2sd"
                  title="Secretaría de Extensión Universitaria"
                  subtitle="Mgter. Gabriela Aschkar">
                  OTROO
                    </Tab>
                <Tab
                  defaultClass="unstilo"
                  name="s2sd"
                  title="Secretaría de Extensión Universitaria"
                  subtitle="Mgter. Gabriela Aschkar">
                  OTROO2
                    </Tab>
              </Tabs>

            </Tab>
          </Tabs>
        </div>
      </section>
    )
  }
}

export default Institucional;
