import React from 'react';
import './styles.scss';

class HomePlano extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <section id='home-plano'>
        <div className='wrapper-central'>
          <h1>Plano CURZAS</h1>
          <a href="/plano">
            <div className="image-container">
              <img id='plano-curza' src='images/planoCurza.jpg'/>
              <div className="text-overlay">
                <p>INGRESAR AL MAPA INTERACTIVO</p>
              </div>
            </div>
          </a>
        </div>
      </section>  
    )
  }
}

export default HomePlano;
