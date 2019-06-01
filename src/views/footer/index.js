import React from 'react';
import './styles.scss';
import WpMenu from 'wp/menu';

class Footer extends React.Component {
  render(){
    return(
      <div id='footer'>
        <div className='wrapper-central'>
          <div className="contenedor">
            <div className="columna">
              <img className="footer-logo" src={"/images/logo_blanco.png"} alt="Logo" />
            </div>
            <div className="vertical-line"></div>
            <div className="columna-2">
              <h3>Centro Regional Universitario Zona Atlántica</h3>
              <p>Monseñor Esandi y Ayacucho.</p>
              <p>Viedma(85009), Río Negro, Argentina.</p>
              <p>Teléfonos: +54-2920-422921/423772</p>
              <div className='redes-sociales'>
                <WpMenu location='redes-sociales-menu-location' />
              </div>
            </div>
            <div className="vertical-line"></div>
            <div className="columna">
              <div className="main-menu">
                <WpMenu location='main-menu-location' />
              </div>
            </div>
          </div>
        </div>
        <a href="#main" className="subir"><span className="fas fa-arrow-up"></span></a>
      </div>
    )
  }
}

export default Footer;
